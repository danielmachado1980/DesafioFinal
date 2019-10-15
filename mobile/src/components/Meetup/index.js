import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Image,
  InfoContainer,
  Title,
  LocationContainer,
  LocationContainerHorizontal,
  LocationImage,
  LocationText,
  Subscribe,
  SubscribeText,
} from './styles';

export default function Meetup({ meetup, isCancel, subscribe, cancel }) {
  return (
    <Container>
      <Image source={{ uri: meetup.banner.url }} />
      <InfoContainer>
        <Title>{meetup.name}</Title>
        <LocationContainer>
          <LocationContainerHorizontal>
            <LocationImage>
              <Icon name="event" size={14} color="#999" />
            </LocationImage>
            <LocationText>
              {meetup.formattedDate}
            </LocationText>
          </LocationContainerHorizontal>
          <LocationContainerHorizontal>
            <LocationImage>
              <Icon name="place" size={14} color="#999" />
            </LocationImage>
            <LocationText>
              {meetup.location}
            </LocationText>
          </LocationContainerHorizontal>
          <LocationContainerHorizontal>
            <LocationImage>
              <Icon name="person" size={14} color="#999" />
            </LocationImage>
            <LocationText>
              {`Organizador: ${meetup.user.fullname}`}
            </LocationText>
          </LocationContainerHorizontal>
        </LocationContainer>
        <Subscribe onPress={!isCancel ? subscribe : cancel}>
          <SubscribeText>{`${
            !isCancel ? 'Realizar' : 'Cancelar'
            } Inscrição`}
          </SubscribeText>
        </Subscribe>
      </InfoContainer>
    </Container>
  );
}

Meetup.defaultProps = {
  isCancel: false,
  subscribe: null,
  cancel: null,
};

Meetup.propTypes = {
  subscribe: PropTypes.func,
  cancel: PropTypes.func,
  isCancel: PropTypes.bool,
  meetup: PropTypes.shape({
    name: PropTypes.string,
    formattedDate: PropTypes.string,
    location: PropTypes.string,
    banner: PropTypes.shape({
      url: PropTypes.string,
    }),
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};
