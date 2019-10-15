import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import * as Yup from 'yup';

import { signOut } from '../../store/modules/auth/actions';
import { updateRequest } from '../../store/modules/user/actions';

import {
  Container,
  Form,
  TextInput,
  SubmitButton,
  SubmitButtonText,
  LogoutButton,
  Bar,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function updateProfile() {
    const payload = {
      fullname,
      email,
      oldPassword,
      password,
      confirmPassword,
    };

    const schema = Yup.object().shape({
      fullname: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPass, field) =>
          oldPass ? field.required() : field
        ),
      confirmPassword: Yup.string()
        .min(6)
        .when('password', (pass, field) =>
          pass ? field.required().oneOf([Yup.ref('password')]) : field
        ),
    });

    if (!(await schema.isValid(payload))) {
      Alert.alert('Dados inválidos.');
    } else {
      dispatch(updateRequest(payload));

      setOldPassword('');
      setPassword('');
      setConfirmPassword('');
    }
  }

  function logout() {
    dispatch(signOut());
  }

  useEffect(() => {
    setFullname(profile.fullname);
    setEmail(profile.email);
  }, [profile.email, profile.fullname]);

  return (
    <Container>
      <Form>
        <TextInput
          placeholder="Digite seu nome"
          autoCapitalize="words"
          onChangeText={setFullname}
          value={fullname}
        />
        <TextInput
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
        <Bar />
        <TextInput
          placeholder="Senha atual"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={setOldPassword}
          value={oldPassword}
        />
        <TextInput
          placeholder="Nova senha"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TextInput
          placeholder="Confirmação de senha"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <SubmitButton onPress={updateProfile}>
          <SubmitButtonText>Salvar perfil</SubmitButtonText>
        </SubmitButton>
        <LogoutButton onPress={logout}>
          <SubmitButtonText>Sair do Meetapp</SubmitButtonText>
        </LogoutButton>
      </Form>
    </Container>
  );
}

function tabBarIcon({ tintColor }) {
  return <Icon name="person" size={20} color={tintColor} />;
}

Profile.navigationOptions = {
  tabBarIcon,
  tabBarLabel: 'Meu perfil',
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
