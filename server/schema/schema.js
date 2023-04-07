const Nurse = require("../models/Nurse.js");
const Patient = require("../models/Patient.js");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

//Patient Type
const PatientType = new GraphQLObjectType({
  name: "Patient",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    nurse: {
      type: NurseType,
      resolve(parent, args) {
        return nurses.findById(parent.nurseId);
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
  }),
});

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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
