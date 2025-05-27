import React, {useState, useEffect} from "react";
import Loading from "../components/loading/Loading";
import styled from "styled-components";
import { fetchEpicImages } from "../api/apiNasa"; // Import your fetch function
//import PropTypes from 'prop-types'

//TODO: criar o card para renderizar data, 
//TODO: style for page, de acordo com o planeado 
//TODO: adicionar uma imagem de fundo 
//TODO: criar cards globais/especificos
//TODO:  criar o componente erro e mensagem 
// TODO: criar um ficheiro so para os fetchs

const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25rem auto !important;
`;

const ContainerError = styled.div``; 
const ContainerNoDataReturned = styled.div``;
const EpicContainer = styled.div``;
const EpicTitle = styled.h2``;
const EpicDescription = styled.p``;
const ContainerCardEpic = styled.div``;


const EpicPage = (props) => {
  const [data, setData] = useState(null); // Estado para armazenar os dados da API
  const [load, setLoad] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros

  useEffect(() => {
    const fetchData = async () => {
      setLoad(true);
      setError(null);
      try {
        const response = await fetchEpicImages(); // Chama a função de fetch
        setData(response);
      } catch (err) {
        setError(
          new Error(
            "Failed to fetch EPIC images. Please try again later."
          )
        );
      } finally {
        setLoad(false);
      }
    };

    fetchData();
  }, []);

  if (load) {
    return (
      <ContainerLoading className="d-flex justify-content-center align-items-center my-5">
        <Loading speedborder="0.7" fonts="8" size="1" />
      </ContainerLoading>
    );  
  }


  if (error) {
    return `ERROR: ${error.message}`; //TODO: criar component erro
  }


  if (!data || data.length === 0) {
    return "No data available for EPIC images.";//TODO: criar component mensage 
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
