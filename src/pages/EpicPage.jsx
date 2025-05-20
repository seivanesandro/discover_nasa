import React, {useState, useEffect} from "react";
import Loading from "../components/loading/Loading";
import axios from "axios";
import styled from "styled-components";
//import PropTypes from 'prop-types'

//TODO: criar o card para renderizar data, style for page, de acordo com o planeado, uma imagem de funco, com os cards em contraste, criar o componente erro, com efeito e adicionar estilos de efeitos.

const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25rem auto !important;
`;

const ContainerError = styled.div``; 
const ContainerNoDataReturned = styled.div``;
const EpicContainer = styled.div`
  background: #fff;
  color: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10rem 0 10rem 0;
`;

const EpicTitle = styled.h2``;
const EpicDescription = styled.p``;
const ContainerCardEpic = styled.div``;




const apiUrl = "https://api.nasa.gov/EPIC/api/natural/images?";
const apiKey = "api_key=Vo9ZpaXL1QOZjGwIxtPK5PFHIOaed70IQcwCCDmD";

const EpicPage = (props) => {
  const [data, setData] = useState(null); // Estado para armazenar os dados da API
  const [load, setLoad] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros

  useEffect(() => {
    const fetchData = async () => {
      setLoad(true);
      setError(null);
      try {
        const response = await axios.get(`${apiUrl}${apiKey}`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoad(false);
      }
    };

    fetchData();
  }, []);

  if (load) {
    return (
      <ContainerLoading className="d-flex justify-content-center align-items-center my-5">
        <Loading speedborder="0.7" fontsize="8" size="1" />
      </ContainerLoading>
    );  
  }


  if (error) {
    return <div>Error: {error.message}</div>;  
  }


  if (!data || data.length === 0) {
    return <div>No data available</div>; 
  }

  return (
    <>

      <EpicContainer className="epicPage container-fluid text-center">
        <h2>EPIC - Earth Polychromatic Imaging Camera</h2>
        <p>
          The EPIC camera onboard the NOAA/NASA DSCOVR spacecraft takes images
          of the entire sunlit side of Earth every two hours.
          <br />
          <em>
            The images are used to monitor the Earth's atmosphere, weather, and
            climate.
          </em>
        </p>

        {data.slice(0, 5).map((item) => {
          const date = item.date.split(" ")[0];
          const [year, month, day] = date.split("-");
          const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${item.image}.png`;

          return (
            <div className="container-Card-Epic" key={item.identifier} style={{marginBottom: "20px"}}>
              <img
                src={imageUrl}
                alt={item.caption}
                style={{width: "300px", borderRadius: "8px"}}
              />
              <p>
                <strong>Data:</strong> {item.date}
              </p>
              <p>
                <strong>Legenda:</strong> {item.caption}
              </p>
            </div>
          );
        })}
      </EpicContainer>

    </>
  );
};

EpicPage.propTypes = {};

export default EpicPage;
