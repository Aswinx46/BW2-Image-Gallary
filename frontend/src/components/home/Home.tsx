import { useChangeImageOrder, useChangePassword, useDeleteImage, useFetchImages, useUpdateImage, useUpdateTitle, useUploadImageToCloudinary, useUploadImageToDB, useUserLogout } from '@/hooks/userHooks'
import ImageGallery from './ImageGallery'
import { toast } from 'sonner'
import type { ImageType } from '@/types/imageType'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import type { ImageUpdateOrderType } from '@/types/updateOrderType'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import PasswordChangeModal from '../otherComponents/changePasswordModal'

function Home() {

    const userId = localStorage.getItem('userId')
    const uploadImageToCloudinary = useUploadImageToCloudinary()
    const updateTitle = useUpdateTitle()
    const uploadImageToDb = useUploadImageToDB()
    const updateImage = useUpdateImage()
    const fetchImages = useFetchImages()
    const changeOrder = useChangeImageOrder()
    const deleteImage = useDeleteImage()
    const logout = useUserLogout()
    const changePassword = useChangePassword()
    const [images, setImages] = useState<ImageType[] | []>([])
    const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const imagesFromBackend: ImageType[] = fetchImages?.data?.images
    useEffect(() => {
        setImages(imagesFromBackend)
    }, [imagesFromBackend])
    if (fetchImages.isLoading) {
        return <p>Loading...</p>
    }


    // const [images, setImages] = useState<ImageType[] | []>([])
    const handleUploadImage = async (file: File, title: string): Promise<void> => {
        try {
            if (!userId) return
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "BW2_ImageGallery");
            formData.append('cloud_name', 'dyrx8qjpt');
            const response = await uploadImageToCloudinary.mutateAsync(formData)

            const data = {
                userId: userId,
                imageUrl: response.secure_url,
                title,
                imageOrder: images.length + 1
            }
            uploadImageToDb.mutate(data, {
                onSuccess: () => {
                    toast('imageUploaded')
                    queryClient.invalidateQueries({ queryKey: ['images'] })

                },
                onError: (err) => {
                    toast(err.message)
                    console.log('error while uploading image to the db', err)
                }
            })
        } catch (error) {
            console.log('error while uploading images to the cloudinary', error)
            toast('Error while uploading image to the cloudinary')
        }
    }

    const handleDelete = async (imageId: string): Promise<void> => {
        deleteImage.mutate(imageId, {
            onSuccess: () => {
                toast('Image Deleted')
                const updatedImages = images
                    .filter((img) => img._id !== imageId)
                    .map((img, index) => ({
                        ...img,
                        imageOrder: index, // Reassign order from 0...
                    }))

                // Set updated images to state
                console.log(updatedImages)
                setImages(updatedImages)
                const updatedOrder = images.filter((img) => img._id !== imageId).map((img) => ({
                    _id: img._id,
                    imageOrder: img.imageOrder
                }))

                handleChangeOrder(updatedOrder)

            },
            onError: (err) => {
                console.log(err)
                toast(err.message)
            }
        })
    }

    const handleChangeOrder = async (data: ImageUpdateOrderType[]) => {
        changeOrder.mutate(data, {
            onSuccess: () => {
                toast('Order Changed')
            },
            onError: (err) => {
                console.log('error while changing order', err)
                toast(err.message)
            }
        })
    }

    const handleUpdateTitle = async (imageId: string, newTitle: string) => {
        const selectedImage = images.find((image) => image._id === imageId)
        if (!selectedImage) {
            toast('No image found in this ID')
            return
        }
        updateTitle.mutate({ imageId, newTitle }, {
            onSuccess: (data) => {
                console.log('this is the updated image', data.updatedImage)
                setImages((prev) => prev.map((img) => img._id === data.updatedImage._id ? data.updatedImage : img))
                // console.log('after updating',images)
                queryClient.invalidateQueries({ queryKey: ['images'] })
                toast('Title changed')
            },
            onError: (err) => {
                console.log('error while updating title', err)
                toast(err.message)
            }
        })
    }

    const handleUpdateImage = async (imageId: string, image: File) => {
        try {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "BW2_ImageGallery"); // change this
            formData.append('cloud_name', 'dyrx8qjpt');
            const response = await uploadImageToCloudinary.mutateAsync(formData)
            updateImage.mutate({ imageId, imageUrl: response.secure_url }, {
                onSuccess: (data) => {
                    console.log(data.updatedImage)
                    setImages((prev) => prev.map((img) => img._id === data.updatedImage._id ? data.updatedImage : img))
                },
                onError: (err) => {
                    console.log('updating image', err)
                    toast(err.message)
                }
            })
        } catch (error) {
            console.log('error while updating the image to the cloudinary', error)
            toast('error while updating the image to the cloudinary')
        }

    }

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => {
                localStorage.removeItem('user')
                localStorage.removeItem('userId')
                navigate('/')
                toast('user  LoggedOut')
            },
            onError: (err) => {
                toast(err.message)
            }
        })
    }

    const handleChangePassword = (oldPassword: string, newPassword: string) => {
        const id = localStorage.getItem('userId')
        if (!id) {
            toast("Please Login Again")
            navigate('/', { replace: true })
            return
        }
        changePassword.mutate({ id, oldPassword, newPassword }, {
            onSuccess: () => {
                toast('Password Changed')
                setShowChangePasswordModal(false)
            },
            onError: (err) => {
                toast(err.message)

            }
        })
    }

    return (
        <div className='flex justify-center items-center bg-black h-full'>
            <Button className='bg-blue-600 self-start self mt-12' onClick={() => setShowChangePasswordModal(true)}>Change Password</Button>
            {showChangePasswordModal && <PasswordChangeModal isOpen={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)} onPasswordChange={handleChangePassword} />}
            {images && <ImageGallery images={images} onDelete={handleDelete} onUpdateTitle={handleUpdateTitle} onUpload={handleUploadImage} userId={userId!} onUpdateImage={handleUpdateImage} onChangeOrder={handleChangeOrder} />}
            <Button className='bg-red-600 self-start self mt-12' onClick={handleLogout}>LOGOUT</Button>
        </div>
    )
}

export default Home
