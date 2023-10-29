import React, { useState } from 'react';


const initialData = [
  {
    name: 'Documents',
    type: 'folder',
    isOpen: false,
    children: [
      { name: 'Document1.jpg', type: 'file', isUserAdded: false },
      { name: 'Document2.jpg', type: 'file', isUserAdded: false },
      { name: 'Document3.jpg', type: 'file', isUserAdded: false },
      {
        name: 'Data',
        type: 'folder',
        children: [
          { name: 'Data1.pdf', type: 'file', isUserAdded: false },
          { name: 'Data2.pdf', type: 'file', isUserAdded: false },
        ],
      },
    ],
  },
  {
    name: 'Desktop',
    type: 'folder',
    isOpen: false,
    children: [
      { name: 'Screenshot1.jpg', type: 'file', isUserAdded: false },
      { name: 'videopal.mp4', type: 'file', isUserAdded: false },
    ],
  },
  {
    name: 'Downloads',
    type: 'folder',
    isOpen: false,
    children: [
      { name: 'Printerdriver.dmg', type: 'file', isUserAdded: false },
      { name: 'cameradriver.dmg', type: 'file', isUserAdded: false },
    ],
  },
];

function Structure() {
  const [data, setData] = useState(initialData);

  const toggleFolder = (folder) => {
    folder.isOpen = !folder.isOpen;
    setData([...data]);
  };

  const isNameUnique = (folder, name) => {
    const lowerCaseName = name.toLowerCase();
    return !folder.children.some((child) => child.name.toLowerCase() === lowerCaseName);
  };
  
  const addFile = (folder) => {
    const fileName = prompt('Enter the file name :');
    if (fileName) {
      const trimmedFileName = fileName.trim();
      if (trimmedFileName === "") {
        alert('Please provide a valid file name.');
      } else if (trimmedFileName.length > 30) {
        alert('File name cannot be more than 30 characters.');
      } else if (isNameUnique(folder, trimmedFileName)) {
        folder.children.push({ name: trimmedFileName, type: 'file', isUserAdded: true });
        setData([...data]);
      } else {
        alert('Name already exists. Please choose a different name');
      }
    }
  };
  
  const addFolder = (folder) => {
    const folderName = prompt('Enter the folder name :');
    if (folderName) {
      const trimmedFolderName = folderName.trim();
      if (trimmedFolderName === "") {
        alert('Please provide a valid folder name.');
      } else if (trimmedFolderName.length > 30) {
        alert('Folder name cannot be more than 30 characters.');
      } else if (isNameUnique(folder, trimmedFolderName)) {
        folder.children.push({ name: trimmedFolderName, type: 'folder', children: [], isUserAdded: true });
        setData([...data]);
      } else {
        alert('Name already exists. Please choose a different name');
      }
    }
  };
  
  const editItem = (item) => {
    const newName = prompt('Edit the name:', item.name);
    if (newName) {
      item.name = newName;
      setData([...data]);
    }
  };


  const deleteItem = (item) => {
    const newData = [...data]; 
  
    const deleteRecursive = (items, itemToDelete) => {
      for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];
  
        if (currentItem === itemToDelete) {
          items.splice(i, 1);
          return;
        } else if (currentItem.type === 'folder' && currentItem.children) {
          deleteRecursive(currentItem.children, itemToDelete);
        }
      }
    };

    deleteRecursive(newData, item);
    setData(newData);
  };
  
  
  
  const renderTree = (data, depth = 0) => {
    return data.map((item, index) => (
      <div key={index} style={{ marginLeft: depth * 20 + 'px' }}>
        {item.type === 'folder' ? (
          <div className="folder p-2 m-2">
          <span
    onClick={() => toggleFolder(item)}
    className="cursor-pointer"
    title={item.name.length > 10 ? item.name : ''}
  >
    {item.isOpen ? '➖' : '➕'} {item.name.length > 10 ? item.name.slice(0, 10) + '...' : item.name}
  </span>
            <button onClick={() => addFile(item)} className="px-2 py-1 mx-1 my-1 bg-blue-500 text-white rounded hover:bg-blue-700">
              Add File
            </button>
            <button onClick={() => addFolder(item)} className="px-2 py-1 mx-1 my-1 bg-green-500 text-white rounded hover:bg-green-700">
              Add Folder
            </button>
            {item.isUserAdded && (
              <button
                onClick={() => editItem(item)}
                className="px-2 py-1 mx-1 my-1 bg-yellow-500 text-white rounded hover:bg-yellow-700"
              >
                Edit
              </button>
            )}
            {item.isUserAdded && (
              <button
                onClick={() => deleteItem(item, index)}
                className="px-2 py-1 mx-1 my-1 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            )}
            {item.isOpen && renderTree(item.children, depth + 1)}
          </div>
        ) : (
          <div className="file p-2 m-2">
            <span>📄 {item.name}</span>
            {item.isUserAdded && (
              <button
                onClick={() => editItem(item)}
                className="px-2 py-1 mx-1 my-1 bg-yellow-500 text-white rounded hover-bg-yellow-700"
              >
                Edit
              </button>
            )}
            {item.isUserAdded && (
              <button
                onClick={() => deleteItem(item, index)}
                className="px-2 py-1 mx-1 my-1 bg-red-500 text-white rounded hover-bg-red-700"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="h-screen flex flex-col items-center p-4">
      <div className="container mt-16">
      <h1 className="text-3xl font-bold text-center text-blue-100 mt-5 mb-5">Available Files & Folders</h1>
        {renderTree(data)}
      </div>
    </div>
  );
  
}

export default Structure;
