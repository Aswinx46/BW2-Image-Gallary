import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import ImagePreview from "../otherComponents/ImagePreview"
import ImageCard from "./ImageCard"
import { toast } from "sonner"
import type { ImageUpdateOrderType } from "@/types/updateOrderType"

interface ImageType {
  _id: string
  imageUrl: string
  imageOrder: number
  userId: string
  title: string
}

interface ImageGalleryProps {
  images: ImageType[]
  userId?: string
  onUpload: (file: File, title: string) => Promise<void>
  onDelete: (imageId: string) => Promise<void>
  onUpdateTitle: (imageId: string, newTitle: string) => Promise<void>
  onUpdateImage: (imageId: string, image: File) => Promise<void>
  onChangeOrder: (data: ImageUpdateOrderType[]) => Promise<void>
}

export default function ImageGallery({ images, onUpload, onDelete, onUpdateTitle, onUpdateImage, onChangeOrder }: ImageGalleryProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadTitle, setUploadTitle] = useState("")
  const [showPreview, setShowPreview] = useState<boolean>(false)
  const [imageString, setImageString] = useState("")
  const [imageFile, setImageFile] = useState<File | null>()
  const [updatingImage, setUpdatingImage] = useState<boolean>(false)
  const [updatingImageUrl, setUpdatingImageUrl] = useState<string | null>(null)
  const [sortedImages, setSortedImages] = useState<ImageType[] | []>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    setSortedImages([...images].sort((a, b) => a.imageOrder - b.imageOrder))
  }, [images])
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageString(URL.createObjectURL(file))
      setShowPreview(true)
      setImageFile(file)
    }
  }

  const handleSubmitImagePreview = () => {
    if (!imageFile) {
      toast("Please select a image")
      return
    }
    setShowPreview(false)
    if (updatingImage && updatingImageUrl) {
      onUpdateImage(updatingImageUrl, imageFile)
      setUpdatingImage(false)
      setUpdatingImageUrl(null)
      setImageFile(null)
      return
    }
    handleUpload(imageFile)
  }

  const handleRemoveSelectedFile = () => {
    setShowPreview(false)
    setImageString("")
    setImageFile(null)
  }

  const handleUpload = async (file: File) => {
    if (!uploadTitle.trim()) {
      alert("Please enter a title for the image")
      return
    }

    setIsUploading(true)
    try {
      await onUpload(file, uploadTitle)
      setUploadTitle("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleEditImage = async (imageId: string) => {
    setUpdatingImage(true)
    setUpdatingImageUrl(imageId)
    fileInputRef.current?.click()
  }


  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10)
    if (isNaN(draggedIndex)) return

    const reordered = [...images]
    const draggedItem = reordered.find((img) => img.imageOrder === draggedIndex)
    const targetItem = reordered.find((img) => img.imageOrder === targetIndex)

    if (!draggedItem || !targetItem || draggedItem === targetItem) return

    // Swap their imageOrder
    const temp = draggedItem.imageOrder
    draggedItem.imageOrder = targetItem.imageOrder
    targetItem.imageOrder = temp

    // Sort and update the UI
    const updated = reordered.sort((a, b) => a.imageOrder - b.imageOrder)
    setSortedImages(updated)

    const payload = images.map(({ _id, imageOrder }) => ({ _id, imageOrder }))
    console.log(payload)
    // Optionally: send to backend here
    onChangeOrder(payload)
    // updateImageOrderInBackend(updated)
  }



  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Image Gallery</h1>
        {showPreview && (
          <ImagePreview
            imageUrl={imageString}
            isOpen={showPreview}
            onSubmit={handleSubmitImagePreview}
            onClose={handleRemoveSelectedFile}
          />
        )}

        {/* Upload Section */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <Label htmlFor="title" className="text-white">
                Image Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter image title..."
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />

              <div className="flex items-center space-x-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || !uploadTitle.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? "Uploading..." : "Upload Image"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images Grid */}
        {sortedImages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No images uploaded yet</div>
            <div className="text-gray-500 text-sm mt-2">Upload your first image to get started</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedImages.map((image) => (
              <ImageCard
                key={image._id}
                image={image}
                onDelete={onDelete}
                onUpdateTitle={onUpdateTitle}
                onEditImage={handleEditImage}
                onDrop={handleDrop}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

