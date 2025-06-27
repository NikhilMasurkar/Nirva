import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  textBold: {
    fontWeight: 'bold', //TODO should be local to code
  },
  fontfamily: {
    fontFamily: 'NunitoSans-Regular',
  },
  container: {
    flex: 1,
  },
  containerJustifyCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flexRowJustifyCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRowJustifySpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
