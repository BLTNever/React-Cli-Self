
import { handleActions } from 'redux-actions';
import { cloneDeep } from 'lodash'

const cPersonalProfile = {
    workInfo: {},
    personalInfo: {},
    eduInfo: {},
    cardInfo: {},
    contractInfo: {},
    contactInfo: {},
    socialInfo: {},
    familyInfo: {},
    personalMaterial: {}
}

const yorN = [{
    "value": "Y", "label": "是"
},
{
    "value": "N", "label": "否"
}]

const yorW = [{
    "value": "Y", "label": "有"
},
{
    "value": "N", "label": "无"
}]

const convertDropdownData = (data) => ({
    politicalStatusType: data.politicalStatusType,
    highestEduType: data.educationType,
    marriageType: data.marriageType,
    residenceTypeType: data.residenceType,
    employeeTypeType: data.employeeType,
    employeeStatusType: data.employeeStatusType.filter((x) => x.value !== '1' && x.value !== '4'),
    contractPeriodTypeType: data.contractPeriodType,
    deptType: data.deptType,
    childSexType: data.sexType,
    probationPeriodTypeType: data.probationPeriodType,
    certTypeType: data.certificateType,
    contractTypeType: data.contractType,
    urgentContactsRelationType: data.contactsPeopleType,
    nationTypeType: data.nationType,
    isSocialInsuranceType: yorN,
    isHousingFundType: yorN,
    isHasChildrenType: yorW
});

const getPersonalProfile = (state, action) => {
    const { personalProfile } = state;
    // const personalProfile = convertProfileData(action.payload);
    // const newProfile = mapValues((action.payload || {}), (innerV, innerK)=>typeof innerV === 'object'?innerV.key:innerV);
    const { personalProfile: newProfile, formSettings } = action.payload || {};
    const newData = { ...personalProfile, ...newProfile }
    return { ...state, personalProfile: { ...newData }, oldData: { ...newData }, formSettings }
}

const saveProfile = (state, action) => {
    const body = action.payload
    const { personalProfile } = state
    const oldData = { ...personalProfile, ...body }
    return { ...state, oldData }
}

const clearCancelProfile = (state, action) => {
    const fields = action.payload
    const { personalProfile, oldData } = state
    const recoveryData = fields.reduce((acc, f) => {
        const value = oldData[f]
        acc[f] = typeof value === 'object' ? { ...value } : value
        return acc
    }, {})
    return { ...state, personalProfile: { ...personalProfile, ...recoveryData } }
}

//定义reducer
const reducer = handleActions({
    GET_PERSONAL_PROFILE: (state, action) => getPersonalProfile(state, action),
    GET_ALL_DROPDOWN_MAP_PROFILE: (state, action) => ({ ...state, dropdowns: convertDropdownData(action.payload) }),
    ON_PROFILE_FIELD_CHANGE: (state, action) => {
        return ({ ...state, personalProfile: action.payload })
    },
    CLEAR_PROFILE_CACHE: (state, action) => {
        const clearData = cloneDeep(cPersonalProfile)
        return { ...state, personalProfile: clearData, oldData: clearData, formSettings: [] }
    },
    SAVE_PROFILE: (state, action) => saveProfile(state, action),
    CLEAR_CANCEL_PROFILE: (state, action) => clearCancelProfile(state, action),
}, {
        personalProfile: {},
        provinceData: {},
        dropdowns: {},
        oldData: {},
        formSettings: []
    });

export default reducer;
