import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MessageComponent from "../message/MessageComponent";

const apiUrlLibraryVideos = process.env.REACT_APP_NASA_URL_LIBRARY_VIDEOS;

const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
`;

const VideoPlayerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const VideoPlayerComponentStyle = styled.video`
  width: 100%;
  max-width: 480px;
  height: auto;
  min-height: 200px;
  border-radius: 8px;
  box-shadow: 0 2px 16px #0006;
  background: #111;
  z-index: 1;
`;

const getVideoUrl = async (nasa_id) => {
  const res = await fetch(`${apiUrlLibraryVideos}/${nasa_id}`);
  if (!res.ok) return null;
  const data = await res.json();
  const mp4 = data.collection.items.find((item) => item.href.endsWith(".mp4"));
  let url = mp4 ? mp4.href : null;
  // Força sempre https
  if (url && url.startsWith("http://")) {
    url = url.replace("http://", "https://");
  }
  return url;
};

const VideoPlayerComponent = ({ nasa_id, poster }) => {
  const [videoUrl, setVideoUrl] = useState(undefined);


  useEffect(() => {
    setVideoUrl(undefined);
    getVideoUrl(nasa_id).then(setVideoUrl);
  }, [nasa_id]);

  if (videoUrl === undefined)
    return (
      <ContainerLoading style={{ color: "#fff" }}>
        Loading Video...
      </ContainerLoading>
    );
  if (!videoUrl)
    return (
      <div>
        <MessageComponent messageFetch="No Video Avaiable" />
      </div>
    );
  return (
    <>
      <VideoPlayerWrapper>
        <VideoPlayerComponentStyle
          controls
          poster={poster}
          className="video-player"
          >
          <track kind="captions" srcLang="en" label="English" />
          <track kind="captions" srcLang="pt" label="Português" />
          <source src={videoUrl} type="video/mp4" />O teu browser não suporta
          vídeo.
        </VideoPlayerComponentStyle>

      </VideoPlayerWrapper>
    </>
  );
};

VideoPlayerComponent.propTypes = {
  nasa_id: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPlayerComponent;
