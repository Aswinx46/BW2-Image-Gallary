import { useFetchImages, useUploadImageToCloudinary, useUploadImageToDB } from '@/hooks/userHooks'
import ImageGallery from './ImageGallery'
import { toast } from 'sonner'
import type { ImageType } from '@/types/imageType'
import { useQueryClient } from '@tanstack/react-query'

function Home() {

    const userId = localStorage.getItem('userId')
    const uploadImageToCloudinary = useUploadImageToCloudinary()
    const uploadImageToDb = useUploadImageToDB()
    const fetchImages = useFetchImages()
    console.log('images from backend', fetchImages.data)
    const queryClient = useQueryClient()
    if (fetchImages.isLoading) {
        return <p>Loading...</p>
    }
    const images: ImageType[] = fetchImages?.data?.images
    console.log(images)
    // const [images, setImages] = useState<ImageType[] | []>([])
    const handleUploadImage = async (file: File, title: string): Promise<void> => {
        try {
            if (!userId) return
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "BW2_ImageGallery"); // change this
            formData.append('cloud_name', 'dyrx8qjpt');
            const response = await uploadImageToCloudinary.mutateAsync(formData)

            const data: ImageType = {
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

    }

    const handleUpdateTitle = async (imageId: string, newTitle: string) => {

    }

    return (
        <div>
            <ImageGallery images={images} onDelete={handleDelete} onUpdateTitle={handleUpdateTitle} onUpload={handleUploadImage} userId={userId!} />
        </div>
    )
}

export default Home
