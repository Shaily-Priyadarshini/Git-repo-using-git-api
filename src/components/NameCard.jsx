import { useEffect, useState } from "react";

const NameCard = ({ info }) => {
    const {
        login: name,
        avatar_url: image,
        html_url: profileUrl
    } = info;

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false); 

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.github.com/users/${name}/repos`);
                if (!response.ok) {
                    throw new Error("Failed to fetch repositories");
                }
                const data = await response.json();
                setRepos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [name]);


    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    return (
        <>
            <div className="nameCard">
                <div className="img">
                    <img className="profilephoto" src={image} alt={`${name}'s avatar`} />
                </div>
                <div className="details">
                    <h2 style={{ fontSize: "23px" }}>
                        {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                    </h2>
                    <a style={{ color: "#646464" }} href={profileUrl} target="_blank" rel="noopener noreferrer">
                        {profileUrl}
                    </a>
                    <div className="repodetails">
                        {loading && <span>Loading repositories...</span>}
                        {error && <span>Error: {error}</span>}
                        {!loading && !error && repos.length > 0 && (
                            repos.slice(0, 1).map((repo) => (
                                <div className="repo" key={repo.id}>
                                    <span>{repo.name} </span>
                                    <span style={{fontWeight:"bold"}}>{repo.language || ""}</span>
                                    {isAccordionOpen && ( 
                            <div className="accordion-content">
                                {repos.slice(1).map((repo) => (
                                    <div className="repo" key={repo.id}>
                                        <span>{repo.name}</span>
                                        <span style={{fontWeight:"bold"}}>{repo.language || ""}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                                </div>
                            ))
                        )}
                        {!loading && !error && repos.length === 0 && (
                            <div className="repo">
                                <span>No repositories found</span>
                            </div>
                        )}
                        <div className="detailsbtn" onClick={toggleAccordion}>
                            <button style={{ color: "#147abc" }}>Details</button>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default NameCard;
