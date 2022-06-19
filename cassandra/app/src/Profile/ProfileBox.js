import React, { forwardRef, useEffect, useState } from "react";
import { restURL, authToken } from "../Services/CassandraService";
import './ProfileBox.css'

const ProfileBox = forwardRef(
    ({ user }, ref) => {
        const [profileData, setProfileData] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            getProfileData();

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const getProfileData = async () => {
            if (authToken == null) {
                setTimeout(getProfileData, 1000);
            } else {
                const response = await fetch(restURL +
                    `/v2/keyspaces/twitter/user_stats?where={"user_id":{"$eq":[${user.userID}]}}&fields=follower_len,follows_len`, {
                    method: 'GET',
                    credentials: "include",
                    headers: {
                        'X-Cassandra-Token': authToken
                    }
                });
                const jsonData = await response.json();
                setProfileData(jsonData.data);
                setLoading(false);
            }
        };

        return (
            <div className="profile">
                <div className="banner">
                    <div className="avatar"><img alt="Bird" src="./logo.svg" /></div>
                </div>

                <div className="profileData">
                    <h1>{user.username}</h1>
                    <h2>@{user.username}</h2>

                    <p>Just a Bird</p>
                    {loading ? <div></div> :

                        <div className="follow">
                            <span>
                                <strong>{profileData[0].follower_len}</strong> Follower
                            </span>
                            <span>
                                <strong>{profileData[0].follows_len}</strong> Following
                            </span>
                        </div>
                    }

                </div>
                <div className="tabs">
                    <div className="active">Kikerikis</div>
                    <div className="disabled">Kikerikis and Answers</div>
                    <div className="disabled">Media</div>
                    <div className="disabled">Likes</div>
                </div>
            </div>
        );
    });

export default ProfileBox;