"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, Eye, Trash2, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import ImagePreview from "../otherComponents/ImagePreview"
import { toast } from "sonner"

interface ImageType {
  _id?: string
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
  onUpdateTitle: (imageId: string, newTitle: string) => Promise<void>,
  onUpdateImage: (imageId: string, image: File) => Promise<void>
}

export default function ImageGallery({ images, onUpload, onDelete, onUpdateTitle, onUpdateImage }: ImageGalleryProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadTitle, setUploadTitle] = useState("")
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null)
  const [editingTitle, setEditingTitle] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState("")
  const [showPreview, setShowPreview] = useState<boolean>(false)
  const [imageString, setImageString] = useState('')
  const [imageFile, setImageFile] = useState<File | null>()
  const [updatingImage, setUpdatingImage] = useState<boolean>(false)
  const [updatingImageUrl, setUpdatingImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      toast('Please select a image')
      return
    }
    setShowPreview(false)
    if (updatingImage && updatingImageUrl) {
      onUpdateImage(updatingImageUrl, imageFile)
      setEditingTitle(null)
      setUpdatingImage(false)
      setUpdatingImageUrl(null)
      setImageFile(null)
      return
    }
    console.log('aksj')
    handleUpload(imageFile)
  }

  const handleRemoveSelectedFile = () => {
    setShowPreview(false)
    setImageString('')
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

  const handleDelete = async (imageId: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await onDelete(imageId)
      } catch (error) {
        console.error("Delete failed:", error)
        alert("Failed to delete image")
      }
    }
  }

  const handleTitleEdit = async (imageId: string) => {
    if (!newTitle.trim()) return

    try {
      await onUpdateTitle(imageId, newTitle)
      setEditingTitle(null)
      setNewTitle("")
    } catch (error) {
      console.error("Title update failed:", error)
      alert("Failed to update title")
    }
  }

  const startEditingTitle = (image: ImageType) => {
    setEditingTitle(image._id || "")
    setNewTitle(image.title)
  }

  const handleEditImage = async (imageId: string) => {
    setUpdatingImage(true)
    setUpdatingImageUrl(imageId)
    fileInputRef.current?.click()

    // if (imageFile) {
    //   await onUpdateImage(imageId, imageFile)
    //   setUpdatingImage(false)

    //   setUpdatingImageUrl(null)
    // }
  }



  const sortedImages = [...images].sort((a, b) => a.imageOrder - b.imageOrder)

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Image Gallery</h1>
        {showPreview && <ImagePreview imageUrl={imageString} isOpen={showPreview} onSubmit={handleSubmitImagePreview} onClose={handleRemoveSelectedFile} />}
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
              <Card
                key={image._id}
                className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-gray-600 transition-colors"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setSelectedImage(image)}
                            className="bg-gray-800 hover:bg-gray-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-800 max-w-4xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">{selectedImage?.title}</DialogTitle>
                          </DialogHeader>
                          <div className="flex justify-center">
                            <img
                              src={selectedImage?.imageUrl || "/placeholder.svg"}
                              alt={selectedImage?.title}
                              className="max-w-full max-h-[70vh] object-contain"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => startEditingTitle(image)}
                        className="bg-gray-800 hover:bg-gray-700"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(image._id!)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Title Section */}
                  <div className="p-4">
                    {editingTitle === image._id ? (
                      <div className="flex flex-col gap-2 space-x-2">
                        <Input
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white text-sm"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleTitleEdit(image._id!)
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => handleTitleEdit(image._id!)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleEditImage(image._id!)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Change Image
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingTitle(null)}
                          className="border-gray-600 bg-gray-900 text-gray-300 hover:bg-gray-800"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <h3 className="text-white font-medium text-sm truncate">{image.title}</h3>
                    )}
                    <div className="text-gray-400 text-xs mt-1">Order: {image.imageOrder}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
