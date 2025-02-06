import { Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text, View, ViewScreen } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
    const [currentEmail, setCurrentEmail] = React.useState('');
    const [newEmail, setNewEmail] = React.useState('');
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

    return (
        <ViewScreen>
            <View style={styles.supportContainer}>
                <Text style={styles.supportTitle}>Modify Email Address</Text>

                <View>
                    <Text style={styles.inputLabel}>Current email</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="E.g. debbie.baker@example.com"
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            value={currentEmail}
                            onChangeText={setCurrentEmail}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.inputLabel}>Enter New Email Address</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="E.g. debbie.baker@example.com"
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            value={newEmail}
                            onChangeText={setNewEmail}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.loadMoreButton}>
                    <LinearGradient
                        colors={['#5BD1C1', '#74D3D5', '#6FCBE4', '#00B6F1']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    >
                        <Text style={styles.buttonText}>Update</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.divider} />

                <Text style={styles.supportTitle}>Modify Password</Text>

                <View>
                    <Text style={styles.inputLabel}>Current Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your current password"
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            secureTextEntry
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.inputLabel}>Enter New Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your new password"
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                    </View>
                </View>

                <View>
                    <Text style={styles.inputLabel}>Confirm New Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your new password"
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            secureTextEntry
                            value={confirmNewPassword}
                            onChangeText={setConfirmNewPassword}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.loadMoreButton}>
                    <LinearGradient
                        colors={['#5BD1C1', '#74D3D5', '#6FCBE4', '#00B6F1']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    >
                        <Text style={styles.buttonText}>Update</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ViewScreen >
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10
    },
    faqItem: {
        backgroundColor: 'rgba(18, 18, 18, 0.5)',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(91, 209, 193, 0.2)',
        transform: [{
            scale: 1
        }]
    },
    faqItemExpanded: {
    },
    faqHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12
    },
    playIcon: {
        width: 10,
        height: 10,
        resizeMode: 'contain',
        marginTop: 5
    },
    expandIcon: {
        width: 15,
        height: 15,
        position: 'absolute',
        right: 0,
        resizeMode: 'contain',
        marginTop: 5

    },
    faqTitle: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        color: '#fff',
        paddingRight: 32
    },
    faqContentContainer: {
        overflow: 'hidden'
    },
    faqContent: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: '#fff',
        lineHeight: 24,
    },
    scrollView: {
        flex: 1,
    },
    supportContainer: {
        padding: 20,
        marginTop: 20,
        backgroundColor: 'rgba(12, 12, 12, 0.78)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(91, 209, 193, 0.2)',
    },
    supportTitle: {
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        color: '#fff',
        marginBottom: 21,
    },
    supportDescription: {
        fontSize: 12,
        fontFamily: 'Montserrat-Light',
        color: '#C4DCD9',
        lineHeight: 18,
        marginBottom: 20,
        opacity: 0.8,
    },
    issueContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderRadius: 20,
    },
    issueTitle: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: '#fff',
        marginBottom: 14,
    },
    inputContainer: {
        backgroundColor: 'rgba(15, 15, 15, 1)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(91, 209, 193, 0.2)',
        paddingHorizontal: 14,
        paddingVertical: Platform.OS === 'ios' ? 18 : 4,
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: '#fff',
        marginBottom: 14,
    },
    input: {
        color: '#fff',
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
    },
    loadMoreButton: {
        borderRadius: 12,
        borderCurve: 'continuous',
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    buttonText: {
        color: '#000',
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(91, 209, 193, 0.2)',
        marginTop: 30,
        marginBottom: 20,
    },
});
