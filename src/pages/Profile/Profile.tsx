
import RiIcon from "../../components/RiIcon/Rilcon";
import useModalHeadless from "../../hooks/useModalHeadless";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import { useReloadApiKeyMutation } from "../../app/modules/auth/auth.api";
// import ProfileComponent from './ProfileComponent'

export default function Profile() {
    const { createModal } = useModalHeadless();
    const { profile, refetchProfile } = useProfile();
    const [name, setName] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            await refetchProfile();
        }
        fetchData();
    }, []);
    
    const [reloadApi] = useReloadApiKeyMutation();

    return (
        <div className="max-w-[93rem] mx-auto px-2 sm:px-4 lg:px-8 md:py-4">
            <div className="max-w-3xl w-full rounded-xl px-2 md:px-8 md:py-4 mx-auto mt-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <RiIcon
                        name="arrow-left-s-line"
                        className="bg-dark2 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center text-lg bg-opacity-70 hover:bg-opacity-100 cursor-pointer"
                        ></RiIcon>
                        <h1 className="font-semibold text-xl">My Account</h1>
                    </div>
                    <div className="rotate-90 cursor-pointer">
                        <RiIcon
                        name="more-2-fill"
                        className="text-lg text-slate-300 hover:text-white"
                        />
                    </div>
                    </div>
                    <div className="mt-8 md:mt-10">
                    <div className="flex space-x-4 items-center">
                        <span className="relative inline-block">
                        <img
                            src="https://avatars.githubusercontent.com/u/33565557?v=4"
                            alt=""
                            className="w-16 h-16 rounded-full"
                        />
                        <div className="bg-white text-sm text-dark w-5 h-5 rounded-full flex justify-center items-center absolute top-0 right-0 ring-4 ring-dark">
                            <RiIcon name="pencil-fill" />
                        </div>
                        </span>
                        <div>
                        <h1 className="text-xl font-semibold mb-1">{profile?.name}</h1>
                        <div className="bg-primary text-xs rounded-md px-2 py-1 inline">
                            Free
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="mt-8 bg-[#20212c] rounded-xl px-6 py-2">
                    <ProfileComponent
                        title="Display name"
                        content={profile?.name}
                        buttonContent="Edit"
                        onClick={() =>
                        createModal({
                            type: "edit",
                            title: "Change display name",
                            content: profile.name,
                            btnText: "Save",
                            label: "Display name",
                            onSubmit: (txt: unknown) => {
                            console.log(txt);
                            },
                        })
                        }
                    />
                    {/* <ProfileComponent title="Email" content="admin@xlg.ai" /> */}
                    <ProfileComponent
                        title="API key"
                        content={profile?.api_key}
                        buttonContent="Refresh key"
                        onClick={async () => {
                        await reloadApi({});
                        refetchProfile();
                        }}
                    />
                    <ProfileComponent title="Username" content={profile?.username} />
                    </div>
                    <div className="mt-4 bg-[#20212c] rounded-xl">
                    <div className="px-6 py-2">
                        <SubscriptionComponent
                        title="Your current plan"
                        content="XLG Free"
                        buttonContent="Upgrade to pro"
                        />
                    </div>
                    <Link
                        to="/plan"
                        className="flex justify-center items-center bg-[#272833] rounded-b-xl py-3 cursor-pointer"
                    >
                        See all Plans{" "}
                        <RiIcon name="arrow-right-line" className="ml-2 text-white" />
                    </Link>
                    </div>
                    <div className="mt-6 flex justify-center">
                    <Link
                        to="/logout"
                        className="inline-block bg-[#272833] rounded-xl px-8 py-3 opacity-90 hover:opacity-100"
                    >
                        Sign out
                    </Link>
                </div>
            </div>
         </div>
     );
}

    type ProfileComponentProps = {
        title: string;
        content: string;
        buttonContent?: string;
        onClick?: () => void;
    };
    const ProfileComponent:React.FC<ProfileComponentProps> = ({ title, content, buttonContent, onClick }) => {
    
        return (
        <div className="py-4 flex justify-between items-center">
            <div>
            <div className="text-sm text-slate-400">{title}</div>
            <div className="mt-1 text-lg text-white">{content}</div>
            </div>
            {buttonContent && (
            <button
                onClick={() => {
                onClick && onClick();
                }}
                className="rounded-lg text-sm bg-[#414153] px-5 py-2 bg-opacity-80 hover:bg-opacity-100"
            >
                {buttonContent}
            </button>
            )}
        </div>
        );
    };

    type SubscriptionComponentProps = {
        title: string;
        content: string;
        buttonContent: string;
    };
  
    const SubscriptionComponent: React.FC<SubscriptionComponentProps> = ({ title, content, buttonContent }) => {
        return (
        <div className="py-4 flex justify-between items-center">
            <div>
            <div className="text-sm text-slate-400">{title}</div>
            <div className="mt-1 text-lg text-white">{content}</div>
            </div>
            <button className="rounded-lg text-sm bg-gradient-to-r from-primary to-[#FD7F2C] px-5 py-2">
            {buttonContent}
            </button>
        </div>
        );
    };
  