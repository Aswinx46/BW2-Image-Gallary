"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ImagePreviewProps {
    imageUrl: string
    isOpen: boolean
    onClose: () => void
    onSubmit: () => void
    title?: string
}

export default function ImagePreview({
    imageUrl,
    isOpen,
    onClose,
    onSubmit,
    title = "Image Preview",
}: ImagePreviewProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-gray-900 border-gray-800 max-w-4xl p-0 overflow-hidden">
                {/* Header with title and close button */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <h2 className="text-white text-lg font-semibold">{title}</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-gray-400 hover:text-white hover:bg-gray-800"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Image container */}
                <div className="flex justify-center items-center bg-black min-h-[400px] max-h-[70vh] overflow-hidden">
                    {imageUrl ? (
                        <img
                            src={imageUrl || "/placeholder.svg"}
                            alt="Preview"
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "/placeholder.svg?height=400&width=400"
                            }}
                        />
                    ) : (
                        <div className="text-gray-400 text-center">
                            <div className="text-lg mb-2">No image to preview</div>
                            <div className="text-sm">Invalid image URL</div>
                        </div>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex justify-end space-x-3 p-4 border-t border-gray-800 bg-gray-900">
                    <Button
                        variant="outline"
                        onClick={onSubmit}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                        Submit
                    </Button>
                    <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
