import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Button, // @demo remove-current-line
  Text,
} from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps } from "../navigators" // @demo remove-current-line
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("../../assets/images/goals.png")
const welcomeFace = require("../../assets/images/welcome-face.png")
const todoIcon = require("../../assets/icons/check-sign.png")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
  _props, // @demo remove-current-line
) {
  // @demo remove-block-start
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  function goNext() {
    navigation.navigate("Dashboard", { screen: "DemoShowroom" })
  }

  useHeader({
    rightTx: "common.logOut",
    onRightPress: logout,
  })
  // @demo remove-block-end

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.greetingApp"
          preset="heading"
        />
        <Text tx="welcomeScreen.subGreetingApp" preset="subheading" />
        {/* <Image style={$welcomeFace} source={todoIcon} resizeMode="contain" /> */}
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen.appScript" size="md" />
        {/* @demo remove-block-start */}
        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="welcomeScreen.letsGo"
          onPress={goNext}
        />
        {/* @demo remove-block-end */}
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 200,
  width: "100%",
  // marginBottom: spacing.huge,
}

const $welcomeFace: ImageStyle = {
  height: 69,
  width: 169,
  position: "absolute",
  bottom: 20,
  right: -30,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.small,
}
