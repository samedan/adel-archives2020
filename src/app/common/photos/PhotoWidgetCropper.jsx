import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css"; // see installation section above for versions of NPM older than 3.0.0

// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default

export default function PhotoWidgetCropper({ setImage, imagePreview }) {
  const cropper = useRef(null);

  function cropImage() {
    if (typeof cropper.current.getCroppedCanvas() === "undefined") {
      return;
    }
    cropper.current.getCroppedCanvas().toBlob((blob) => {
      setImage(blob);
    }, "image/jpeg");
  }

  return (
    <Cropper
      ref={cropper}
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      // Cropper.js options
      aspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      cropBoxResisable={true}
      crop={cropImage}
    />
  );
}
