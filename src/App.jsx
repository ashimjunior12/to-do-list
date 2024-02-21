import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [names, setNames] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (names.trim() !== '') {
      const fakeId = Date.now();
      const newNames = { id: fakeId, name: names };
      const updatedItems = [...items, newNames];
      setItems(updatedItems);
      setNames('');
    }
    else{
      setErrorMessage(true);
      setTimeout(()=>{
        setErrorMessage(false)
      },3000)
    }
  };


  const clearItems = (id) => {
    const toBeCleared = items.filter((item) => item.id !== id);
    setItems(toBeCleared);
  };

  return (
    <>
      <div className='form-wrapper'>
        <form className='form' onSubmit={handleSubmit}>
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

      {errorMessage && (        
          <p style={{padding:'10px', textAlign:'center', textTransform:'capitalize'}} className='alert-danger'>please add something</p>
      )}

      <div>
        {items.map((item) => (
          <div
            style={{
              width: '80%',
              justifyContent: 'space-between',
              display: 'flex',
              margin: '40px auto',
            }}
            key={item.id}
          >
            <h4>{item.name}</h4>
            <button className='btn' onClick={() => clearItems(item.id)}>
              clear item
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
