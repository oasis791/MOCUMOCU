import React from 'react';
import {Text, View} from 'react-native';

function TermsOfUse() {
  return (
    <View>
<<<<<<< HEAD:front/MOCUMOCU-main/src/pages/MoreComponent/TermsOfUse.tsx
      <Text>이용약관</Text>
=======
      <StatusBar hidden={true} />

      <View style={styles.mainHeader}>
        <View style={styles.headerButtonWrapper}>
          <Pressable onPress={onSubmitAlarm}>
            <Image
              source={
                isAlarm
                  ? require('../assets/icon/mainAlarmActive.png')
                  : require('../assets/icon/mainAlarm.png')
              }
              style={styles.headerAlarm}
            />
          </Pressable>

          <Pressable onPress={onSubmitSetting}>
            <Image
              source={require('../assets/icon/mainSetting.png')}
              style={styles.headerSetting}
            />
          </Pressable>
        </View>
      </View>
>>>>>>> 583f05bbfaa40f1f6743d98bce87c9657114aaab:front/MOCUMOCU-main/src/pages/ModifyInfo.tsx
    </View>
  );
}

export default TermsOfUse;
