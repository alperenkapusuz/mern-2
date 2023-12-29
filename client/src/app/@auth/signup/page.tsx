"use client"
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const page = () => {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>signup</DialogTitle>
          <DialogDescription>
            desc
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default page;
