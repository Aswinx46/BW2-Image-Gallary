"use client"

import { useState } from "react"
import { Eye, Trash2, Edit3, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ImageType {
    _id?: string
    imageUrl: string
    imageOrder: number
    userId: string
    title: string
}

interface ImageCardProps {
    image: ImageType
    onDelete: (imageId: string) => Promise<void>
    onUpdateTitle: (imageId: string, newTitle: string) => Promise<void>
    onEditImage: (imageId: string) => void
    onDrop: (e: React.DragEvent, targetIndex: number) => void

}

export default function ImageCard({ image, onDelete, onUpdateTitle, onEditImage, onDrop }: ImageCardProps) {
    const [editingTitle, setEditingTitle] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState(image.title)

    const handleTitleEdit = async () => {
        if (!newTitle.trim()) return

        try {
            await onUpdateTitle(image._id!, newTitle)
            setEditingTitle(false)
        } catch (error) {
            console.error("Title update failed:", error)
            alert("Failed to update title")
        }
    }

    const startEditingTitle = () => {
        setEditingTitle(true)
        setNewTitle(image.title)
    }

    return (
        <Card className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-gray-600 transition-colors"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", image.imageOrder.toString())}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, image.imageOrder)}
        >
            <CardContent className="p-0">
                <div className="relative aspect-square">
                    <img src={image.imageUrl || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />

                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm" variant="secondary" className="bg-gray-800 hover:bg-gray-700">
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-900 border-gray-800 max-w-4xl">
                                <DialogHeader>
                                    <DialogTitle className="text-white">{image.title}</DialogTitle>
                                </DialogHeader>
                                <div className="flex justify-center">
                                    <img
                                        src={image.imageUrl || "/placeholder.svg"}
                                        alt={image.title}
                                        className="max-w-full max-h-[70vh] object-contain"
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Button size="sm" variant="secondary" onClick={startEditingTitle} className="bg-gray-800 hover:bg-gray-700">
                            <Edit3 className="w-4 h-4" />
                        </Button>

                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(image._id!)}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Title Section */}
                <div className="p-4">
                    {editingTitle ? (
                        <div className="flex flex-col gap-2 space-x-2">
                            <Input
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white text-sm"
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        handleTitleEdit()
                                    }
                                }}
                            />
                            <Button size="sm" onClick={handleTitleEdit} className="bg-green-600 hover:bg-green-700">
                                Save
                            </Button>
                            <Button size="sm" onClick={() => onEditImage(image._id!)} className="bg-green-600 hover:bg-green-700">
                                Change Image
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingTitle(false)}
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
    )
}
