import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { SearchIcon } from "@heroicons/react/solid";

import baseURL from "../utils/baseURL";

export const Search = () => {
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const { data, isLoading, isSuccess } = useQuery(
    ["search", searchText],
    async () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      const promise = await axios.get(`${baseURL}/api/search/${searchText}`, {
        cancelToken: source.token,
      });

      promise.cancel = () => {
        source.cancel();
      };

      return promise.data;
    },
    { enabled: !!searchText }
  );

  const handleChangeSearch = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  const handleClickUser = (user) => {
    router.push(`/${user.username}`);
    setSearchText("");
  };

  const handleClickPost = (post) => {
    router.push(`/posts/${post._id}`);
    setSearchText("");
  };

  const handleClickSearchAdvanced = () => {
    router.push("/search");
    setSearchText("");
  };

  return (
    <div className="relative flex items-center justify-center flex-1 px-2 lg:ml-6 lg:justify-end">
      <div className="w-full max-w-lg lg:max-w-xs">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-green-400" aria-hidden="true" />
          </div>

          <input
            id="search"
            name="search"
            className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            placeholder="Search for users and posts..."
            type="search"
            value={searchText}
            onChange={handleChangeSearch}
            autoComplete="off"
          />
          {searchText.trim() !== "" && !isLoading && !isSuccess && (
            <div className="absolute z-50 w-full px-2 py-4 bg-white rounded shadow-2xl top-14">
              <h1 className="mb-2 text-sm font-semibold">Users</h1>
              <div className="flex flex-col space-y-2">
                {!data.users || data.users.length === 0 ? (
                  <p className="text-xs text-gray-400">No users found ... </p>
                ) : (
                  data.users.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleClickUser(user)}
                      className="flex items-center cursor-pointer"
                    >
                      <Image
                        src={user.profilePicUrl}
                        height={30}
                        width={30}
                        className="object-cover rounded-full"
                      />
                      <p className="ml-2 text-base">
                        {user.name.length > 20
                          ? user.name.substring(0, 20) + "..."
                          : user.name}
                      </p>
                    </div>
                  ))
                )}
                <h1 className="my-2 text-sm font-semibold">Posts</h1>

                {!data.posts || data.posts.length === 0 ? (
                  <p className="text-xs text-gray-400"> No posts found ...</p>
                ) : (
                  data.posts.map((post) => (
                    <div
                      key={post._id}
                      onClick={() => handleClickPost(post)}
                      className="flex items-center cursor-pointer"
                    >
                      <Image
                        src={post.images[0]}
                        height={40}
                        width={60}
                        className="rounded"
                      />
                      <div>
                        <p className="ml-2 text-sm font-semibold">
                          {post.title.length > 20
                            ? post.title.substring(0, 20) + "..."
                            : post.title}
                        </p>
                        <p className="ml-2 text-xs text-gray-600">
                          {post.user.name.length > 20
                            ? post.user.name.substring(0, 20) + "..."
                            : post.user.name}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <a
                onClick={handleClickSearchAdvanced}
                className="block mt-4 text-xs text-center text-pink-600 cursor-pointer"
              >
                Try Advanced Search
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
