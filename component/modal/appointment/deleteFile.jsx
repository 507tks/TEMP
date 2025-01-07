import { Dialog, DialogBody, Typography, Button } from "@material-tailwind/react";

const deleteFile = ({ open, toggler }) => {
  return (
    <Dialog open={open} handler={toggler}>
      <DialogBody className="flex justify-center items-center flex-col gap-4">
        <Typography className="text-xl font-semibold text-black">
          Are you sure you want to delete <span className="text-blue-400 font-bold">{}</span>?
        </Typography>
        <span className="flex gap-4">
          <Button color="red" onClick={() => toggler()}>
            No
          </Button>
          <Button color="green">Yes</Button>
        </span>
      </DialogBody>
    </Dialog>
  );
};

export default deleteFile;
