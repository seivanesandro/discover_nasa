import React, {useState, useEffect} from "react";
import Loading from "../components/loading/Loading";
import axios from "axios";
import styled from "styled-components";
//import PropTypes from 'prop-types'

//TODO: criar o card para renderizar data, style for page, de acordo com o planeado, uma imagem de funco, com os cards em contraste, criar o componente erro, com efeito e adicionar estilos de efeitos.

const EpicContainer = styled.div`
  background: #fff;
  color: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Loading speedborder="0.7" fontsize="8" size="1" />
      </div>
    ); // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Exibe uma mensagem de erro se ocorrer um erro
  }
  if (!data || data.length === 0) {
    return <div>No data available</div>; // Exibe uma mensagem se não houver dados
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
          const date = item.date.split(" ")[0]; // yyyy-mm-dd
          const [year, month, day] = date.split("-");
          const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${item.image}.png`;

          return (
            <div key={item.identifier} style={{marginBottom: "20px"}}>
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
