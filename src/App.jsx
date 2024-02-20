import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './index.css';

function App() {
  const [items, setItems] = useState([]);
  const [names, setNames] = useState('');

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if(storedItems){
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fakeId = Date.now();
    const newNames = { id: fakeId, name: names };
    const updatedItems = [...items, newNames];
    setItems(updatedItems);
    setNames('');
  };

  const clearItems = (id) => {
    const toBeCleared = items.filter((item) => item.id !== id);
    setItems(toBeCleared);
  };

  return (
    <>
      <div className='form-wrapper' onSubmit={handleSubmit}>
        <form className='form'>
          <label htmlFor='items' className='form-label'>
            <h4>add items</h4>
          </label>
          <input
            type='text'
            className='form-input'
            onChange={(e) => setNames(e.target.value)}
            value={names}
          />
          <button
            type='submit'
            className='btn btn-block'
            style={{ marginTop: '20px' }}
          >
            add items
          </button>
        </form>
      </div>
      {items.map((item) => {
        const { id, name } = item;
        return (
          <div
            style={{
              width:'80%',
              justifyContent: 'space-between',
              display: 'flex',
              margin: '40px auto',
            }}
            key={id}
          >
            <h4>{name}</h4>
            <button className="btn" onClick={()=>clearItems(id)}>clear item</button>
          </div>
        );
      })}
    </>
  );
}

export default App;
