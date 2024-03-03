import React, { useEffect, useState } from 'react';

const JobRoleNFTDisplay = ({ tokenId }) => {
    const [nftData, setNftData] = useState(null);

    useEffect(() => {
        const fetchNFTMetadata = async () => {
            if (!tokenId) {
                console.error("Invalid tokenId:", tokenId);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3002/api/nft/metadata/${tokenId}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }
                const data = await response.json();
                setNftData(data);
            } catch (error) {
                console.error("Error fetching NFT metadata:", error);
            }
        };

        fetchNFTMetadata();
    }, [tokenId]);

    if (!nftData) return <div>Loading...</div>;

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <img src={nftData.image} alt="Job Role NFT" style={{ maxWidth: '300px', borderRadius: '10px' }} />
            <h2>{nftData.name}</h2>
            <p>{nftData.description}</p>
            <div>
                {nftData.attributes?.map((attribute, index) => (
                    <p key={index}><strong>{attribute.trait_type}:</strong> {attribute.value}</p>
                ))}
            </div>
        </div>
    );
};

export default JobRoleNFTDisplay;
