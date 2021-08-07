import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import Message from "Components/Message";
import Section from "Components/Section";
import Poster from "Components/Poster";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(10px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 50px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`
  font-size: 14px;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Imdb = styled.a``;

const Logo = styled.img`
  position: relative;
  top: 6px;
  width: 40px;
  height: auto;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 20px;
`;

const VideoContainer = styled.div`
  width: 60%;
  height: 500px;
  margin-bottom: 40px;
  font-size: 14px;
`;

const Video = styled.iframe`
  width: 100%;
  height: 100%;
`;

const SimilarContainer = styled.div`
  width: 100%;
  height: auto;
`;

const DetailPresenter = ({ result, error, loading }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Junflix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message text="Something went wrong..." color="#ffffff" />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Junflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("assets/noPoster.png").default
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>·</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>·</Divider>
            <Imdb
              href={
                result.imdb_id
                  ? `https://www.imdb.com/title/${result.imdb_id}`
                  : `https://www.imdb.com/title/${result.external_ids.imdb_id}`
              }
            >
              <Logo src={require("assets/imdb.png").default} alt="imdb logo" />
            </Imdb>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <VideoContainer>
            {result.videos.results.length > 0 ? (
              <Video
                src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              ></Video>
            ) : (
              "No trailers available"
            )}
          </VideoContainer>
          <SimilarContainer>
            {result.similar.results &&
            result.similar.results.length > 0 &&
            result.original_title ? (
              <Section title="Similar Movies">
                {result.similar.results.map((movie) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.original_title}
                    rating={movie.vote_average}
                    isMovie={true}
                    year={
                      movie.release_date && movie.release_date.substring(0, 4)
                    }
                  />
                ))}
              </Section>
            ) : (
              <Section title="Similar Shows">
                {result.similar.results.map((show) => (
                  <Poster
                    key={show.id}
                    id={show.id}
                    imageUrl={show.poster_path}
                    title={show.original_name}
                    rating={show.vote_average}
                    year={
                      show.first_air_date && show.first_air_date.substring(0, 4)
                    }
                  />
                ))}
              </Section>
            )}
          </SimilarContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
