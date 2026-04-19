import React, { Dispatch, SetStateAction } from "react";
import ImageUpload from "../ImageUpload";

function ImageComponent({
  imageUrl,
  setImageUrl,
  setShowImageUpload,
}: {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
  setShowImageUpload: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="rounded-lg border p-4">
      <ImageUpload
        endpoint="postImage"
        value={imageUrl}
        onChange={(url) => {
          setImageUrl(url);
          if (!url) setShowImageUpload(false);
        }}
      />
    </div>
  );
}

export default ImageComponent;
