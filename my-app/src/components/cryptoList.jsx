import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const ExchangeList = () => {
  const [exchanges, setExchanges] = useState([]);
  const [icon, setIcon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [finaleData, setFinaleData] = useState([]);
// console.log(exchanges)
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10); // Number of records to show per page


  // State for capturing user input
  const [query, setQuery] = useState('');

  // Filtered data based on user input
  const filteredData = finaleData.filter(item =>
    item.exchange_id.toLowerCase().includes(query.toLowerCase())
  );

  // Handler for input change
  const handleInputChange = (e) => {
    setQuery(e.target.value); // Update the query state with input value
  };

  // Fetch exchange and icon data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rest.coinapi.io/v1/exchanges', {
          headers: {
            'X-CoinAPI-Key': 'b41f3252-1b6f-4603-bd97-0aa5039d6d8a',
          },
        });
        setExchanges(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchDataIcon = async () => {
      try {
        const response = await axios.get('https://rest.coinapi.io/v1/exchanges/icons/32', {
          headers: {
            'X-CoinAPI-Key': 'b41f3252-1b6f-4603-bd97-0aa5039d6d8a',
          },
        });
        setIcon(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDataIcon();
    fetchData();
  }, []);

  // Merge exchange and icon data, then sort it
  useEffect(() => {
    const completeData = exchanges.map((item1) => {
      const matchingItem = icon.find(
        (item2) => item2.exchange_id === item1.exchange_id
      );
      return { ...item1, ...matchingItem };
    });

    // Sort the data based on volume_1mth_usd in descending order (high to low)
    const sortedData = completeData.sort((a, b) => b.volume_1mth_usd - a.volume_1mth_usd);

    setFinaleData(sortedData);
  }, [exchanges, icon]);

  // Handling page change
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Calculate pagination
  const offset = currentPage * itemsPerPage;
  const paginatedData = filteredData.slice(offset, offset + itemsPerPage);

  // Loading and error handling
  if (loading) return <div className='w-100 h-100vh d-flex justify-content-center align-items-center'>
    <div className="spinner-border" style={{"width": "3rem", "height": "3rem"}} role="status">
  <span className="visually-hidden">Loading...</span>
</div>
  </div>;
  if (error) return <div>Error: {error}</div>;

  console.log(filteredData)
  return (
    <div className='container'>
      {/* <h1>Exchange List</h1> */}
      
      <div className='cryptoDataTable mt-2'>
      <h1>Exchange List</h1>
      <div className='row my-3'>
        <div className='col-md-12'>
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search" value={query}
        onChange={handleInputChange} />
            <img className='searchIcon' src="https://img.icons8.com/ios-filled/100/FFFFFF/search--v1.png" alt="search--v1"/>
        </div>
        </div>
      </div>
        <ul className='cryptoData ps-0'>

        

        {
            paginatedData.length > 0 ? (
                paginatedData.map((exchange) => (
                    <li className='d-flex justify-content-between align-items-center' key={exchange.exchange_id}>
                      <span className='d-flex g-3'>
                        <img
                          className='mr-2'
                          src={exchange.url ? exchange.url : 'https://img.icons8.com/color-glass/48/remove-image.png'}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://img.icons8.com/color-glass/48/remove-image.png';
                          }}
                          alt={exchange.exchange_id}
                        />
                        <strong>{exchange.exchange_id}</strong>
                      </span>
                      <p> ({exchange.volume_1mth_usd})</p>
                    </li>
                  ))
              ) : (
                <p>No results found</p>
              )
        }
          
        </ul>

        <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredData.length / itemsPerPage)} // Total number of pages
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
      </div>

      {/* ReactPaginate component */}
      
    </div>
  );
};

export default ExchangeList;
