const Nurse = require("../models/Nurse.js");
const Patient = require("../models/Patient.js");
const EmergencyAlert = require("../models/EmergencyAlert.js");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

//Patient Type
const PatientType = new GraphQLObjectType({
  name: "Patient",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    temperature: { type: GraphQLInt },
    heartRate: { type: GraphQLInt },
    bloodPressure: { type: GraphQLString },
    weight: { type: GraphQLInt },
    nurse: {
      type: NurseType,
      resolve(parent, args) {
        return Nurse.findById(parent.nurseId);
      },
    },
  }),
});

//Nurse Type
const NurseType = new GraphQLObjectType({
  name: "Nurse",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

//Emergency Alert Type
const EmergencyAlertType = new GraphQLObjectType({
  name: "Patient",
  fields: () => ({
    id: { type: GraphQLID },
    message: { type: GraphQLString },
    patient: {
      type: PatientType,
      resolve(parent, args) {
        return Patient.findById(parent.patientId);
      },
    },
  }),
});

//QUERIES
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    patients: {
      type: new GraphQLList(PatientType),
      resolve(parent, args) {
        return Patient.find();
      },
    },
    patient: {
      type: PatientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Patient.findById(args.id);
      },
    },
    nurses: {
      type: new GraphQLList(NurseType),
      resolve(parent, args) {
        return Nurse.find();
      },
    },
    nurse: {
      type: NurseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Nurse.findById(args.id);
      },
    },
    emergencyAlerts: {
      type: new GraphQLList(EmergencyAlertType),
      resolve(parent, args) {
        return EmergencyAlert.find();
      },
    },
  },
});

//MUTATIONS
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //Add a Nurse
    addNurse: {
      type: NurseType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }, //The name cannot be null
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const nurse = new Nurse({
          name: args.name,
          username: args.username,
          password: args.password,
        });
        return nurse.save();
      },
    },
    //Delete a Nurse
    deleteNurse: {
      type: NurseType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Nurse.findByIdAndRemove(args.id);
      },
    },
    //Add a Patient
    addPatient: {
      type: PatientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }, //The name cannot be null
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        temperature: { type: GraphQLNonNull(GraphQLInt) },
        heartRate: { type: GraphQLNonNull(GraphQLInt) },
        bloodPressure: { type: GraphQLNonNull(GraphQLString) },
        weight: { type: GraphQLNonNull(GraphQLInt) },
        motivationalTip: { type: GraphQLNonNull(GraphQLString) },
        nurseId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const patient = new Patient({
          name: args.name,
          username: args.username,
          password: args.password,
          temperature: args.temperature,
          heartRate: args.heartRate,
          bloodPressure: args.bloodPressure,
          weight: args.weight,
          motivationalTip: args.motivationalTip,
          nurseId: args.nurseId,
        });
        return patient.save();
      },
    },
    //Update a Patient
    updatePatient: {
      type: PatientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        temperature: { type: GraphQLInt },
        heartRate: { type: GraphQLInt },
        bloodPressure: { type: GraphQLString },
        weight: { type: GraphQLInt },
        motivationalTip: { type: GraphQLString },
        nurseId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Patient.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              username: args.username,
              password: args.password,
              temperature: args.temperature,
              heartRate: args.heartRate,
              bloodPressure: args.bloodPressure,
              weight: args.weight,
              motivationalTip: args.motivationalTip,
              nurseId: args.nurseId,
            },
          },
          { new: true }
        );
      },
    },
    //Delete a Patient
    deletePatient: {
      type: PatientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Patient.findByIdAndRemove(args.id);
      },
    },
    //Add an Emergency Alert
    addEmergencyAlert: {
      type: EmergencyAlertType,
      args: {
        message: { type: GraphQLNonNull(GraphQLString) },
        patientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const emergencyAlert = new EmergencyAlert({
          message: args.message,
          patientId: args.patientId,
        });
        return emergencyAlert.save();
      },
    },
    //Delete an Emergency Alert
    deleteEmergencyAlert: {
      type: EmergencyAlertType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return EmergencyAlert.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
