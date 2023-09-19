import React,{useState,useEffect} from 'react';
import {
	Text,
	Image,
	Flex,
  Wrap,
  WrapItem,
  Center,
	Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"
import axios from 'axios';
import { getLogAktuator } from '../../Utility/api_link';
import Loading from "../../component/loading/loading";
import { useNavigate } from "react-router-dom";
import ValueAktuator from '../value_aktuator/value_aktuator';
import moment from 'moment';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import CardLogActuatorToday from './today_card_log_act'


const CardLogActuator = (props) => {
		const eleminateZ = (date) => {
			let result = date.replace("T", " ").replace("Z", " +0700");
			return result;
		};
    const idApi = props.data.id
		var idLocale = require("moment/locale/id");
		moment.locale("id", idLocale);
    const navigate = useNavigate();
    const [dataTable, setDataTable] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(1);
	  const [totalData, setTotalData] = useState("");
    const [page, setPage] = useState(1);

    const getPagination = async () => {
      setIsLoading(true)

      const header = localStorage.getItem('token')
      await axios.get(`${getLogAktuator}${idApi}&&page=${page}`, {
        headers: {
            'Authorization': 'Bearer ' + header
          }
        })
        .then(response => {
          setDataTable(response.data.data)
          setTotalData(response.data.totalData);
          setTotalPage(response.data.totalPage);
          setIsLoading(false)
        })
        .catch((error) => {
            localStorage.clear()
            navigate('/login')
        })
    }
    

    useEffect(() => {
      getPagination()
    },[idApi,page]);
    return (
        <>
          {dataTable == null || isLoading ? (
          <Loading/> 
          ):(
           <Flex direction={'column'} w={['100%']} margin={'0px'}>
            <CardLogActuatorToday data={{id : idApi}} w={['100%']}/>
                <Flex align={'center'} justify={'center'} w={['100%']}>
                  <Wrap align={'center'} spacing={'10px'} mt={'30px'} w={['100%']}>
									{
										dataTable.map((item,index) => {
											return(
												<Box key={index} 
												w={['100%']}
												classNameName='card-sensor'
												bg={'#ffff'}
												borderRadius={'10px'}
												border={'1px solid #E2E8F0'}
												padding={'10px'}>
												<Flex alignItems={'center'} justifyContent={'space-between'} w={['100%']} direction={{ base: 'column', md: 'row' }}>
													<Flex>
														<Wrap padding={'10px'} w={'60px'}>
															<Image classNameName='Image' w={['100%']} h={['100%']}src={item.on_off_status == 0 ? '/off_log.png' : '/on_log.png'} alt="image" />
														</Wrap>
														<Flex direction={'column'} alignItems={'start'} justifyContent={'center'}>
															<Text>Status{item.on_off_status == 1 ?  (<Text width={'100%'} fontWeight={'bold'} color={'var(--color-secondary-variant)'}>Nyala</Text>) : (<Text width={'100%'} fontWeight={'bold'} color={'var(--color-error)'}>Mati</Text>)}</Text>
															<Text>{moment(eleminateZ(item.created_at)).startOf("seconds").fromNow()}</Text>
														</Flex>
													</Flex>
													<Text>{moment(eleminateZ(item.created_at)).format('MMMM Do YYYY, h:mm:ss a')}</Text>
												</Flex>									
												</Box>
											);
										})
									}
                  </Wrap>
                </Flex>
                {dataTable.length > 0 ? (
                  <Flex justify={"space-between"}>
                    <p>
                      Showing {dataTable.length} of {totalData} entries
                    </p>
                    <nav aria-label="Page navigation example">
                      <ul classNameName="pagination">
                        <li className="previous">
                          <a
                            className="page-link"
                            onClick={() => {
                              setPage(1);
                            }}>
                            <GrFormPrevious />
                          </a>
                        </li>
                        {page - 1 != 0 ? (
                          <li className="page-item">
                            <a
                              className="page-link"
                              onClick={() => {
                                setPage(page - 1);
                              }}>
                              {page - 1}
                            </a>
                          </li>
                        ) : null}
                        <li className="page-item-active">
                          <a className="page-link"> {page}</a>
                        </li>
                        {page + 1 <= totalPage ? (
                          <li className="page-item">
                            <a
                              className="page-link"
                              onClick={() => {
                                setPage(page + 1);
                              }}>
                              {" "}
                              {page + 1}
                            </a>
                          </li>
                        ) : null}
                        <li className="next">
                          <a
                            className="page-link"
                            onClick={() => {
                              setPage(totalPage);
                            }}>
                            <GrFormNext />
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </Flex>
                ) : null}
              </Flex>
            )
          }
        </>
    )
}
export default CardLogActuator;