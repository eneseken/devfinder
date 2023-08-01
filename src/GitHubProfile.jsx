import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaHome, FaTwitter, FaPaperclip, FaBuilding, FaEye } from 'react-icons/fa'

const GitHubUserInfo = () => {
  const [username, setUsername] = useState('');
  const [userDetailsList, setUserDetailsList] = useState([]);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      const userDetails = response.data;
      setUserDetailsList((prevUserDetailsList) => [userDetails, ...prevUserDetailsList]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Function to format date as "dd.mm.yyyy" (e.g., 28.07.2023)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <section className='container d-flex flex-column align-items-center'>

      <header className='navBar mt-5 d-flex  justify-content-between'>
        <h3 className='fw-bolder text-white'>devfinder <FaEye size={30} color='white'/></h3>
        <div>powered by <a href='https://eneseken.com/' className='text-decoration-none' target='_blank'>eneseken</a></div>
      </header>

      <div className="searchSection d-flex flex-wrap justify-content-evenly input-group mb-3  p-2 rounded-4 mt-4">
        <span className="input-group-text bg-transparent border-0" id="basic-addon1"><FaSearch size={20} color='white' /></span>
        <input type="text" placeholder="Search GitHub username..." className="searchInput p-3 bg-transparent border-0 w-75" id="username" onChange={handleChange} aria-describedby="basic-addon1" />
        <button onClick={getUserInfo} className="searchBtn  m-1 p-2 rounded-3" type="button" id="button-addon2">Search</button>
      </div>

      {userDetailsList.length > 0 && userDetailsList.map((userDetails, index) => (
        <section key={index} className='heroSection d-flex p-5 mb-4 rounded-4 justify-content-start gap-4 align-items-start'>
          <div className='leftSection'>
            <img className='avatarImg' src={userDetails.avatar_url} alt="Avatar" />
          </div>

          <div className='rightSection'>

            <section className='d-flex justify-content-between'>

              <div className='leftPlace d-flex flex-column justify-content-center'>

                <h2 className='text-white m-0'>{userDetails.name}</h2>
                <span className='mt-2 login-name'>@{userDetails.login}</span>

                {userDetails.bio ? (
                  <span className='bio-text mt-3'>{userDetails.bio}</span>
                ) : (
                  <span className='no-text mt-3'>This profile has no bio</span>
                )}

              </div>

              <div className='rightPlace'>
                <span className='date-text'>{formatDate(userDetails.created_at)}</span>
                <p className='date-text text-success'>{formatDate(userDetails.updated_at)}</p>
              </div>

            </section>

            <section className='detailSection d-flex flex-column'>

              <div className='userDetail rounded-3 mt-4 d-flex justify-content-around align-items-center'>

                <div className='repoPl'>
                  <h6>Repos</h6>
                  <span className='fw-bolder text-white fs-3'>{userDetails.public_repos}</span>
                </div>

                <div className='followersPl'>
                  <h6>Followers</h6>
                  <span className='fw-bolder text-white fs-3'>{userDetails.followers}</span>
                </div>

                <div className='followingPl'>
                  <h6>Following</h6>
                  <span className='fw-bolder text-white fs-3'>{userDetails.following}</span>
                </div>

              </div>


            </section>

            <section className='infoSection d-flex flex-column gap-3 flex-wrap  p-2  mt-4'>

              <div className='topSection d-flex flex-row justify-content-between '>
                <div className='location d-flex gap-2 align-items-center'>

                  <FaHome size={25} color='white' />
                  {userDetails.location ? (
                    <span>{userDetails.location}</span>
                  ) : (
                    <span className='no-text'>Not Available</span>
                  )}

                </div>

                <div className='twitter d-flex gap-2 align-items-center '>

                  <FaTwitter size={25} color='white' />
                  {userDetails.twitter ? (
                    <span>{userDetails.twitter}</span>
                  ) : (
                    <span className='no-text'>Not Available</span>
                  )}

                </div>

              </div>

              <div className='bottomSection d-flex flex-row justify-content-between'>
                <div className='blog d-flex gap-2 align-items-center'>
                  <FaPaperclip size={25} color='white' />
                  {userDetails.blog ? (
                    <span>{userDetails.blog}</span>
                  ) : (
                    <span className='no-text'>Not Available</span>
                  )}
                </div>


                <div className='company  d-flex gap-2 align-items-center'>

                  <FaBuilding size={20} color='white' />
                  {userDetails.company ? (
                    <span>{userDetails.company}</span>
                  ) : (
                    <span className='no-text'>Not Available</span>
                  )}
                </div>

              </div>


            </section>

          </div>



        </section>
      ))}

    </section>
  );
};

export default GitHubUserInfo;
