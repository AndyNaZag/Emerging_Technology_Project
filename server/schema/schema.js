const Nurse = require("../models/Nurse.js");
const Patient = require("../models/Patient.js");
const EmergencyAlert = require("../models/EmergencyAlert.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
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
  name: "EmergencyAlert",
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

//Auth Data Type
const AuthData = new GraphQLObjectType({
  name: "AuthData",
  fields: () => ({
    userId: { type: GraphQLID },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLInt },
  }),
});

//QUERIES
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    login: {
      type: AuthData,
      args: {
        role: {
          type: new GraphQLEnumType({
            name: "Role",
            values: {
              NURSE: { value: "Nurse" },
              PATIENT: { value: "Patient" },
            },
          }),
        },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let user;
        if (args.role === "Patient") {
          user = await Patient.findOne({ username: args.username });
        } else if (args.role === "Nurse") {
          user = await Nurse.findOne({ username: args.username });
        }
        if (!user) {
          throw new Error("User does not exist!");
        }
        const isEqual = await bcrypt.compare(args.password, user.password);
        if (!isEqual) {
          throw new Error("Password is incorrect!");
        }
        const token = jwt.sign(
          {
            userId: user.id,
            username: user.username,
            role: args.role,
          },
          "somesupersecretkey",
          {
            expiresIn: "1h",
          }
        );
        return { userId: user.id, token: token, tokenExpiration: 1 };
      },
    },
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
    //Create a Nurse
    createNurse: {
      type: NurseType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }, //The name cannot be null
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        try {
          const existingNurse = await Nurse.findOne({
            username: args.username,
          });
          if (existingNurse) {
            throw new Error("Nurse already exists!");
          }
          const hashedPassword = await bcrypt.hash(args.password, 12);
          const nurse = new Nurse({
            name: args.name,
            username: args.username,
            password: hashedPassword,
          });
          const result = await nurse.save();
          return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
          throw err;
        }
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
      resolve(parent, args, req) {
        // if (!req.isAuth) {
        //   throw new Error("Unauthenticated!");
        // }                                          //Only if the user is authenticated
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
