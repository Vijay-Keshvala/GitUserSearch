import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react'

export default function Search() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('')
    
    // const searchGithub =  () => {
    //     setError('')
    //     setUsername('')
    //     if (!username) {
    //         setError('Please Enter username')
    //         return
    //     }

    //     fetch(`https://api.github.com/users/${username}`)
    //     .then((resp)=>{
    //         if (!resp) {
    //             throw new Error(`User not found (status: ${resp.status})`)
    //         }
    //         return resp.json()}
    //     )
    //     .then((data) => {
    //         console.log(data); // Check the data in the console
    //         setUserData(data);
    //         setError('');
    //     })
    //     .catch((err)=>{
    //         setError(err.message)
    //     })

    // }

    useEffect(() => {
        if (!username) {
            setUserData(null); 
            return;
        }

        fetch(`https://api.github.com/users/${username}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`User not found OR Request limit hit (status: ${response.status})`);
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
                setError('');
            })
            .catch((err) => {
                setError(err.message);
                setUserData(null);
            });
    }, [username]);
    return (
        <div className='max-w-md mx-auto '>
            <label htmlFor="price" className="block text-2xl  text-gray-900 font-bold">
                Search Github User
            </label>
            <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <input
                        id="user"
                        name="githubuser"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className=" min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                    {/* <button onClick={searchGithub} className="gap-5 py-1.5 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                        Search
                    </button> */}
                </div>
            </div>
            <div className='result'>
                <label htmlFor="price" className="block text-2xl mt-5  text-gray-900 font-bold text-left">
                    Result
                </label>
                <p className="text-red-600">{error}</p>
                {userData && (
                    <div className="bg-gray-100 p-4 rounded-md">
                        <div className="flex justify-center mb-4">
                            <img
                                src={userData.avatar_url}
                                alt={`${userData.login}'s avatar`}
                                className="w-24 h-24 rounded-full"
                            />
                        </div>
                        <p><strong>Username:</strong> {userData.login}</p>
                        <p><strong>Bio:</strong> {userData.bio || 'No bio available'}</p>
                        <p><strong>Public Repos:</strong> {userData.public_repos}</p>
                        <a
                            href={userData.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:underline"
                        >
                            View Profile
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
