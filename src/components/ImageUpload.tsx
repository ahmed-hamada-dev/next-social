"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative size-40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
          alt="Upload"
          className="size-40 rounded-md object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute right-0 top-0 rounded-full bg-red-500 p-1 shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      className="flex h-64 w-64 items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-100 transition duration-300 hover:bg-gray-200"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}
export default ImageUpload;
