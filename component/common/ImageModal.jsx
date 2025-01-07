
import { Dialog, DialogBody } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';

const ProfilePhotoModal = ({ open, toggleModal, imageUrl }) => {
 const [isVisible, setIsVisible] = useState(open);

 useEffect(() => {
   setIsVisible(open);
 }, [open]);
  return (
    <Dialog
      size="xs"
      open={isVisible}
      handler={toggleModal}
      className="justify-center items-center bg-black rounded-lg"
    >
      <DialogBody className="flex justify-center items-center">
        <img
          src={imageUrl}
          alt="Profile"
          className="w-full h-full rounded-lg object-cover"
        />
      </DialogBody>
    </Dialog>
  );
};

export default ProfilePhotoModal;
