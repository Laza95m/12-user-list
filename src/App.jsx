import { useEffect, useState } from 'react';
import './App.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import axios from 'axios';

// Тут список пользователей: https://reqres.in/api/users

const App = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [invited, setInvited] = useState([]);
  const [sendInvitation, setSendInvitation] = useState(false);

  const onChangeValue = (e) => {
    setSearch(e.target.value);
  };

  const addInvited = (id) => {
    if (invited.includes(id)) {
      setInvited((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvited((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    setLoading(!loading);
    const fetchData = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users');

        setDataUsers(response.data.data);
      } catch (error) {
        console.log(error);
        alert('Ошибка при получении данных');
      } finally {
        setTimeout(() => {
          setLoading(loading);
        }, 1000);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        {sendInvitation ? (
          <Success count={invited.length} />
        ) : (
          <Users
            dataUsers={dataUsers}
            loading={loading}
            search={search}
            onChangeValue={onChangeValue}
            invited={invited}
            addInvited={addInvited}
            setSendInvitation={setSendInvitation}
          />
        )}
      </div>
    </>
  );
};

export default App;
