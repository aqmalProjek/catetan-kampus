"use client";
import { userState } from "@/atoms/userState";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Cover from "@/components/Cover";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { notFound, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ProfileTabs from "./ProfileTabs";
import ProfileContentTabs from "./ProfileContentTabs";

export default function ProfileEdit({params,profileUser,posts}) {
    const userId = params.profile[1];
  const [supabase] = useState(() =>
    createBrowserSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  );
  const pathName = usePathname();
  const isPosts = pathName.includes("/posts") || pathName === "/profile";
  const isAbout = pathName.includes("/about");
  const isFollowers = pathName.includes("/followers");
  const isPhotos = pathName.includes("/photos");
  const [userSession, setUserSession] = useState(null);
  const [profile, setProfile] = useState(profileUser);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [university, setUniversity] = useState("");
  const [position, setPosition] = useState("");
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData,setUserData] = useRecoilState(userState);

  useEffect(() => {
    if(!profileUser){
      fetchUser();
    }

    const loadSession = async() => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserSession(session?.user);
    }

    loadSession()

  }, [userId]);

  const isMyUser = userSession?.id === profile?.id;

  // console.log('user session :', userSession);
  // console.log('isMyuser : ', isMyUser);

  // console.log();

  if (userSession === undefined) {
    notFound();
  }

  const fetchUser = async () => {
    if (userId == undefined) {
      const lod = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUserSession(session?.user);
        supabase
          .from("profiles")
          .select()
          .eq("id", session?.user?.id)
          .then((result) => {
            if (result.status !== 400) {
              setProfile(result?.data[0] || null);
              setUserData(result?.data[0] || null)
            } else {
              setProfile(null);
              return;
            }
          });
        // console.log(session.user.id);
      };

      lod();
    } else {
      supabase.auth.getSession().then((result) => {
        setUserSession(result.data.session.user);
      });
      supabase
        .from("profiles")
        .select()
        .eq("id", userId)
        .then((result) => {
          if (result.error) {
            throw result.error;
          }
          if (result.data) {
            setProfile(result.data[0]);
            setUserData(result?.data[0]);
          }
        });
    }
  };

  const handleEditMode = () => {
    setName(profile?.name);
    setAddress(profile?.address);
    setUniversity(profile?.university);
    setPosition(profile?.position);
    setEditMode(true);
  };

  const submitEdit = async() => {
    if(name == '' || address == '' || university == '' || profile == '') {
      setIsError("Please fill al field");
      return;
    }
    setIsLoading(true);
    const res = await supabase.from('profiles').update({
      name,
      address,
      university,
      position
    }).eq('id', profile.id)
    if (res.error) {
      console.log(res.error);
    }
    await fetchUser();
    setEditMode(false);
    setIsLoading(false);
  }

  
  return (
    <>
      <Card noPadding={true}>
        <div className="relative overflow-hidden rounded-md">
          {profile?.length !== 0 && (
            <Cover
              url={profile?.cover}
              editable={isMyUser}
              onChange={fetchUser}
            />
          )}

          <div className="absolute top-44 left-4">
            <Avatar
              size={"lg"}
              imageUrl={profile?.avatar}
              editable={isMyUser}
              onChange={fetchUser}
            />
          </div>
          {profile?.length !== 0 ? (
            <div className="flex justify-between">
              <div className="ml-32 pb-0">
                {!editMode && (
                  <h1 className="text-2xl font-bold">{profile?.name}</h1>
                )}
                {editMode && (
                  <div>
                    <input
                      type="text"
                      className={`border py-2 px-3 rounded-md mt-2 ${isLoading && 'animate-pulse'}`}
                      disabled={isLoading}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                    />
                  </div>
                )}
                <div className="text-gray-500 leading-4">
                  {!editMode && profile?.address}
                  {editMode && (
                    <div>
                      <input
                        type="text"
                        className={`border py-2 px-3 rounded-md mt-2 ${isLoading && 'animate-pulse'}`}
                        disabled={isLoading}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <div className="text-gray-500 leading-4">
                  {!editMode && `${profile?.university} `}
                  {editMode && (
                    <div>
                      <input
                        type="text"
                        className={`border py-2 px-3 rounded-md mt-2 ${isLoading && 'animate-pulse'}`}
                        disabled={isLoading}
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                      />
                    </div>
                  )}
                  <span className="text-gray-500 italic">As </span>
                  {!editMode && `${profile?.position} `}
                  {editMode && (
                    <div>
                      <input
                        type="text"
                        className={`border py-2 px-3 rounded-md mt-2 ${isLoading && 'animate-pulse'}`}
                        disabled={isLoading}
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
              {isMyUser && !editMode && (
                <div className="m-2">
                  <button
                    onClick={handleEditMode}
                    className="flex gap-2 rounded-md  shadow-md  dark:shadow-gray-800 cursor-pointer py-1 px-2 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                    Edit Profile
                  </button>
                </div>
              )}
              {isMyUser && editMode && (
                <div className="m-2">
                  <button
                    onClick={submitEdit}
                    disabled={isLoading}
                    className={`flex gap-2 rounded-md  shadow-md  dark:shadow-gray-800 cursor-pointer py-1 px-2 ${isLoading && 'animate-pulse'}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Save Profile
                  </button>

                  <span className="mt-2 text-red-500">{isError}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="ml-32 pb-0">
              <h1 className="text-2xl font-bold">
                Sedang mengenali data profile
              </h1>
            </div>
          )}

          <ProfileTabs isPosts={isPosts} isAbout={isAbout} isFollowers={isFollowers} isPhotos={isPhotos} profile={profile} />
        </div>
      </Card>

      <ProfileContentTabs  isPosts={isPosts} isAbout={isAbout} isFollowers={isFollowers} isPhotos={isPhotos} profile={profile} posts={posts}/>
    </>
  )
}
