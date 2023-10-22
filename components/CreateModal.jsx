import React, { useState } from "react";

import { makeStorageClient } from "@/components/Web3Storage";

export default function CreateModal({ setShow }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [file, setFile] = useState();

  async function uploadImage() {
    const web3client = makeStorageClient();
    console.log(file);
    const cid = await web3client.put(file, { wrapWithDirectory: false });
    return cid;
  }

  async function onFormCreateClick() {
    const cid = await uploadImage();
    console.log(cid);

    // SC Create Product
    setShow(false);
  }

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onPriceChange(e) {
    setPrice(e.target.value);
  }

  function onImageChange(e) {
    setFile([e.target.files[0]]);
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Create Product
                </h3>
                <div className="mt-2">
                  <form>
                    <div className="mb-4">
                      <label className="text-xl text-gray-600">Name</label>
                      <input
                        type="text"
                        className="border-2 border-gray-300 p-2 w-full"
                        onChange={(e) => onNameChange(e)}
                        value={name}
                      />
                    </div>
                    {/* image upload */}
                    <div className="mb-4">
                      <label className="text-xl text-gray-600">Image</label>
                      <input
                        type="file"
                        className="border-2 border-gray-300 p-2 w-full"
                        accept="image/png, image/jpeg"
                        onChange={(e) => onImageChange(e)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-xl text-gray-600">Price</label>
                      <input
                        type="text"
                        className="border-2 border-gray-300 p-2 w-full"
                        onChange={(e) => onPriceChange(e)}
                        value={price}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                onClick={async () => await onFormCreateClick()}
              >
                Create
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
