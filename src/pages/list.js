import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { API } from '../config/api'
import { useMutation } from 'react-query';
import '../style/pages.css'
import InfiniteScroll from "react-infinite-scroll-component"


export default function ListComponent() {
    const [items, setItems] = useState([]);

    const [hasMore, sethasMore] = useState(true);

    const [page, setpage] = useState(1);
    const [form, setForm] = useState({
        serch: ''
    });


    useEffect(() => {
        const getComments = async () => {
            const res = await fetch(
                `https://api.thecatapi.com/v1/breeds?limit=10&page=0`
                // For json server use url below
                // `http://localhost:3004/comments?_page=1&_limit=20`
            );
            const data = await res.json();
            setItems(data);
            // setIsSerch(false)
        };

        getComments();
    }, []);

    // useEffect(() => {
    //     const getComments = async () => {

    //         // setIsSerch(false)
    //     };

    //     getComments();
    // }, [value]);

    const fetchComments = async () => {
        const res = await fetch(
            `https://api.thecatapi.com/v1/breeds?limit=10&page=${page}`
            // For json server use url below
            // `http://localhost:3004/comments?_page=${page}&_limit=20`
        );
        const data = await res.json();
        return data;
    };

    const fetchData = async () => {
        const commentsFormServer = await fetchComments();
        setItems([...items, ...commentsFormServer]);
        if (commentsFormServer.length === 0 || commentsFormServer.length < 10) {

            sethasMore(false);
        }
        setpage(page + 1);
    };
    const [selected, setSelected] = useState(null)
    const Toggle = (i) => {
        if (selected == i) {
            return setSelected(null)
        }
        setSelected(i)
    }


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        e.preventDefault()
        const res = await fetch(
            `https://api.thecatapi.com/v1/breeds/search?q=${form.serch}`
            // For json server use url below
            // `http://localhost:3004/comments?_page=1&_limit=20`
        );
        const data = await res.json();
        setItems(data);
    });



    console.log(items);

    return (

        <>
            <InfiniteScroll
                dataLength={items.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<h4></h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>'Yay! You have seen it all'</b>
                    </p>
                }


            >
                <div className='display'>
                    <div className='height'>
                        <div className='nav'>
                            <div className='right'>
                                <h1>List Cats</h1>
                            </div>
                            <form className='input'
                                onSubmit={(e) => handleSubmit.mutate(e)}
                            >

                                <input
                                    onChange={handleChange}
                                    name="serch"
                                    type={Text} />
                                <button className='button'>Serch</button>
                            </form>
                        </div>

                        {
                            items?.map((item, i) => (
                                <tr key={i}>
                                    <div className='item'>
                                        <div className='title'>
                                            <td>{i + 1}. {item.name} </td>
                                            <button
                                                className='button'
                                                onClick={() => Toggle(i)}>{selected == i ? 'tutup' : 'lihat detail'}</button>
                                        </div>
                                        <div className={selected == i ? 'content.show' : 'content'}>
                                            <div className='detail'>
                                                {item?.image?.url !== undefined && (
                                                    <img className='image' src={item.image.url} />
                                                )}
                                                <div >
                                                    <p className='details'>Name : {item.name}</p>
                                                    <p >Description : {item.description}</p>
                                                    <p className='detaiil'>Temperament : {item.temperament}</p>
                                                    <p className='detaiil'>Vet Street : {item.vetstreet_url}</p>
                                                    <p className='detaiil'>Vet Hospitals : {item.vcahospitals_url}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </tr>
                            ))
                        }

                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}


