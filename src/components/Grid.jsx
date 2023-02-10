import React, { useEffect, useRef, useState } from 'react';
const Grid = () => {
  const [boxes, setBoxes] = useState([]);
  const [columns, setColumns] = useState();
  const [showgrid, setShowgrid] = useState(0);
  const [isSorted, setIsSorted] = useState(false);

  // for tracking drag
  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleChange = (event) => {
    setColumns(event.target.value);
  };
  const handleClick = () => {
    setShowgrid(columns);
  };
  const generategrid = (columns) => {
    let newBoxes = [];
    for (let i = 1; i <= columns * columns; i++) {
      newBoxes.push(i);
    }
    return newBoxes;
  };

  const shuffle = (boxes) => {
    return boxes.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setBoxes(shuffle(generategrid(showgrid)));
  }, [showgrid]);

  // darg functions
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    const copyListItems = [...boxes];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setBoxes(copyListItems);
  };

  //   const isSorted = () => {
  //     for (let i = 0; i < boxes.length; i++) {
  //       if (boxes[i] !== i + 1) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   };
  //   useEffect(() => {
  //     if (isSorted()) {
  //       alert("Grid is sorted!");
  //     }
  //   }, [boxes, showgrid]);

  useEffect(() => {
    const sortedGrid = generategrid(showgrid).sort((a, b) => a - b);
    setIsSorted(JSON.stringify(boxes) === JSON.stringify(sortedGrid));
  }, [boxes, showgrid]);

  return (
    <div>
      {isSorted && showgrid > 0 ? (
        <>
          <div
            className='w-100 vh-100 d-flex flex-column justify-content-center align-items-center bg-dark'
            style={{ opacity: 0.8 }}
          >
            <div className='alert alert-success text-center' role='alert'>
              Welcome to the team
            </div>
            <button
              onClick={() => setIsSorted(false)}
              className='btn rounded-5 text-white'
              style={{ backgroundColor: 'darkmagenta' }}
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='w-100 d-flex justify-content-center my-5'>
            <input
              className='rounded-5 mx-2'
              type='number'
              value={columns}
              onChange={handleChange}
              placeholder="Enter a number for Grid"
            />
            <button
              className='btn rounded-5 text-light'
              style={{ backgroundColor: 'darkmagenta' }}
              onClick={handleClick}
            >
              create Grid
            </button>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${showgrid}, 1fr)`,
              gridGap: '5px',
              width: '100%',
              justifyItems: 'center',
            }}
          >
            {boxes?.map((boxer, index) => {
              return (
                <div
                  className='d-flex justify-content-center align-items-center rounded-5'
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'darkmagenta',
                    color: 'white',
                    margin: '5px',
                  }}
                  key={index}
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  draggable
                >
                  {boxer}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Grid;
