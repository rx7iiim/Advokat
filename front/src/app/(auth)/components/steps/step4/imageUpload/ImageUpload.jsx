import React from 'react'

function ImageUpload() {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 w-[200px] h-[200px] bg-white">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <label className="cursor-pointer text-blue-500 hover:underline text-center">
            Click to upload <br /> or drag and drop
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        )}
        <p className="text-xs text-gray-500 mt-2">JPG, JPEG, PNG less than 1MB</p>
      </div>
  )
}

export default ImageUpload
