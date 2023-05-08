import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card, Badge } from "react-bootstrap";
const Learn3 = () => {
    useEffect(()=> {
        getSearch()
    },[])
    const [ids, setIds] = useState([])
    const [user, setUser] = useState([])
    const [value, setValue] = useState([])
    const [artists, setArtists]=useState([])
    const [albums, setAlbums]=useState([])
    const [users, setUsers]=useState([])
    const [tracks, setTracks]=useState([])
    const [showButton, setShowButton]=useState(false)
    const option = [
        {
            "id" : 1,
            "code": "multi",
            "name": "All"
        },
        {
            "id" : 2,
            "code": "albums",
            "name": "Albums"
            
        },
        {
            "id" : 3,
            "code": "artists",
            "name": "Artists"
        },
        {
            "id" : 4,
            "code": "users",
            "name": "Profiles"
        },
    ]
    const getSearch = async(value) => {
        const ress = await fetch('https://spotify23.p.rapidapi.com/user_profile/?id='+value+'&playlistLimit=10&artistLimit=10',{
            method:'GET',
            headers: {
                'X-RapidAPI-Key': '3a11c8e34bmsh24878d91f99a9b0p17a13ejsn7eaf152380c3',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        }).then((response) => response.json())
        console.log(ress)
        setUser(ress)
    }
    const onSubmit = async(code) => {
        console.log(value)
        const url = 'https://spotify23.p.rapidapi.com/search/?q='+value+'&type=multi&offset=0&limit=10&numberOfTopResults=5';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3a11c8e34bmsh24878d91f99a9b0p17a13ejsn7eaf152380c3',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setArtists(result.artists.items)
            setAlbums(result.albums.items)
            setUsers(result.users.items)
            setTracks(result.tracks.items)

        } catch (error) {
            console.error(error);
        }
    }


    const millisToMinutesAndSeconds = (millis) =>  {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    return(
        <>
     
          {/* <Container>
            <Row className="justify-content-center my-5">
                <Col md={1}>
                <img src={user.image_url} style={{width:'50px', height:'50px', float:'left'}}/>
                </Col>
                <Col md={5}>
                    <h3 style={{lineHeight:1.7, fontWeight:700, float:'left'}}>{user.name} </h3>

                    {user.allow_follows === true && user.is_verified === true ? (
                       <>
                         <div className="mt-2 mx-2" style={{fontWeight:800, background:'grey',color:'#fff', width:20, height:20, fontSize:12, borderRadius:100 ,textAlign:'center', lineHeight:1.7, float:'left'}}>&#10003;</div>
                        <Button className="my-2 mx-4" variant="light" disabled={true} style={{fontWeight:800, border:'1px solid #eee'}}>Followed <span style={{fontWeight:800}}>&#10003;</span></Button>
                       </>
                        ) : (
                        <Button className="my-2 mx-4" variant="dark" disabled={false}>Follow</Button>
                            
                    )}
                </Col>
                <Col md={3}>
                   
                </Col>
                <Col md={3}>
                    <Row>
                        <Col md={6}>
                            <small className="mb-0">Following</small>
                            <h3>{user.following_count}</h3>
                            
                        </Col>
                        <Col md={6}>
                            <small className="mb-0">Followers</small>
                            <h3>{user.followers_count}</h3>
                        </Col>
                    </Row>
                </Col>
       
            </Row>
            <Row>
                {user.public_playlists.map((item, i)=>(
                    <Col md={3} key={i}>
                        <div className="text-center">
                        <img src={item.image_url} style={{width:'100px', height:'100px'}}/>
                        <p className="mt-2 mb-4 text-muted">{item.name}</p>
                        </div>
                    </Col>
                ))}
            </Row>
          </Container> */}
          <Container className="my-5">
          <Row>
                <Form.Group>
                    <Form.Label className="mx-4 my-2" style={{float:'left'}}>&#128269;</Form.Label>
                    <Form.Control type="text" style={{width:'30%', float:'left'}} onChange={(e)=>setValue(e.target.value)}/>
                    <Button className="mx-3" variant="dark" onClick={onSubmit}>Cari</Button>
                </Form.Group>
            </Row>
            <Row className="my-4">
            {option.map((o, i)=> (
                <Col md={1} onClick={()=> onSubmit(o.code)}>
                    <Badge pill bg="secondary" className="mx-1 py-2 px-3">{o.name}</Badge>
                </Col>
                ))}

            </Row>
                <Row>
                    {/* ALBUM */}
                                 <h2 style={{fontWeight:700}}>Album</h2>   
                                 <hr/>
                                {albums.map((item, i)=> (
                                    <Col md={4} >
                                        <a href={item.data.uri} style={{textDecoration:'none'}}>
                                        <Card className="mb-3" style={{height:'200px', background:'#eee'}}>
                                            <Card.Body>
                                                    {item.data.coverArt.sources.slice(1, 2).map((c, i)=> (
                                                        <img src={c.url} height={c.height} width={c.width} style={{borderRadius:8}}/>
                                                    ))}
                                                    <h5 style={{fontWeight:700}} className="my-3" key={i}>{item.data.name}</h5>
                                                    {item.data.artists.items.map((c, i)=> (
                                                        <Badge bg="secondary" className="mx-1">{c.profile.name}</Badge>
                                                    ))}
                                            </Card.Body>
                                        </Card>
                                        </a>
                                    </Col>
                                ))}
                </Row>
                <Row>
                    {/* ARTIS */}
                                <h2 style={{fontWeight:700}}>Artists</h2>   
                                 <hr/>
                                {artists.map((item, i)=> (
                                <Col md={4}>
                                      <a href={item.data.uri} style={{textDecoration:'none'}}>
                                    <Card className="mb-3" style={{height:'auto', background:'#eee'}}>
                                        <Card.Body>
                                                {item.data.visuals.avatarImage.sources.slice(1, 2).map((c, i)=> (
                                                    <img className="my-2" src={c.url} height={120} width={120} style={{borderRadius:'50%'}}/>
                                                ))}
                                                <h5 style={{fontWeight:700}} className="mt-3 mx-3 mb-3" key={i}>{item.data.profile.name}</h5>
                                   
                                        </Card.Body>
                                    </Card>
                                    </a>
                                </Col>
                                ))}
                </Row>
                <Row>
                    {/* USERS */}
                                <h2 style={{fontWeight:700}}>Profiles</h2>   
                                 <hr/>
                                {users.map((item, i)=> (
                                <Col md={4}>
                                   
                                    <Card className="mb-3" onClick={()=> getSearch(item.data.username)} style={{height:'auto', background:'#eee'}}>
                                        <Card.Body>
                                               
                                                <img className="mx-2" src={item.data.image.smallImageUrl} height="50px" width="50px" style={{borderRadius:8,float:'left'}}/>
                                                <h5 style={{fontWeight:700, fontSize:16}} className="my-3" key={i}>{item.data.displayName}</h5>
                                   
                                        </Card.Body>
                                    </Card>
                                 
                                </Col>
                                ))}
                </Row>
                <Row>
                    {/* TRACKS */}
                                <h2 style={{fontWeight:700}}>Tracks</h2>   
                                 <hr/>
                                {tracks.map((item, i)=> (
                                <Col md={12}>
                                    <Card className="mb-3" style={{height:'80px', background:'#eee'}}>
                                        <Card.Body>
                                            <Row>
                               
                                                <Col md={1} style={{margin:0,padding:0}}>
                                                <div className="d-flex justify-content-center my-2">
                                                   
                                                    {showButton === true ? (
                                                       <a href={item.data.uri} style={{textDecoration:'none'}}> <div onMouseLeave={()=> setShowButton(false)} style={{fontWeight:800, background:'grey',color:'#fff', width:35, height:35, fontSize:18, borderRadius:100 ,textAlign:'center', lineHeight:1.8,}}>&#9654;</div></a>
                                                    ):(
                                                        <p className="my-0" style={{textAlign:'center', fontWeight:700}} onMouseEnter={()=> setShowButton(true)} >{i+1}</p>
                                                    )}
                                                </div>
                                                </Col>
                                                <Col md={1} style={{margin:0,padding:0}}>
                                                
                                                       <div className="text-center">
                                                       {item.data.albumOfTrack.coverArt.sources.slice(1, 2).map((c, i)=> (
                                                        <img src={c.url} height="50px" width="50px" style={{borderRadius:8,textAlign:'center'}}/>
                                                        ))}
                                                       </div>
                                                </Col>
                                                <Col md={4}>
                                                    <h5 style={{fontWeight:700, fontSize:16}} className="mt-1 mb-0" key={i}>{item.data.name}</h5>
                                                    {item.data.artists.items.map((f,i)=>(
                                                        <small>{f.profile.name}</small>
                                                    ))}

                                                </Col>
                                                <Col md={5}>
                                                    <h5 style={{fontWeight:300, fontSize:14}} className="my-3" key={i}>{item.data.albumOfTrack.name}</h5>
                                                </Col>
                                                <Col md={1}>
                                                <div className="text-center my-3">
                                                    <small>{millisToMinutesAndSeconds(item.data.duration.totalMilliseconds)}</small>
                                                </div>
                                                </Col>
                                            </Row>
                                           
                                   
                                        </Card.Body>
                                    </Card>
                                </Col>
                                ))}
                </Row>
          </Container>
        </>
    )
}

export default Learn3