const Nurse = require("../models/Nurse.js");
const Patient = require("../models/Patient.js");
const EmergencyAlert = require("../models/EmergencyAlert.js");
const MotivationalTip = require("../models/MotivationalTip.js");
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
   // motivationalTip: { type: GraphQLString },
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
//Auth Data Type
const AuthData = new GraphQLObjectType({
  name: "AuthData",
  fields: () => ({
    role: { type: GraphQLString },
    userId: { type: GraphQLID },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLInt },
    nurseName: { type: GraphQLString },
  }),
});

// AddMotivationalTip mutation
const AddMotivationalTip = new GraphQLObjectType({
  name: 'AddMotivationalTip',
  fields: () => ({
    tip: { type: GraphQLString },
    nurse: { type: GraphQLString },
  })
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
      // new field for retrieving a single nurse data by ID
      singleNurse: {
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
    motivationalTips: {
      type: new GraphQLList(AddMotivationalTip),
      resolve(parent, args) {
        return MotivationalTip.find();
      },
    },
  },
});

//MUTATIONS
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
   //Login
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
    if (args.role === "Nurse") {
      const nurse = await Nurse.findById(user.id);
      return {
        role: args.role,
        userId: user.id,
        token: token,
        tokenExpiration: 1,
        nurseName: nurse.name,
      };
    }
    return {
      role: args.role,
      userId: user.id,
      token: token,
      tokenExpiration: 1,
    };
  },
},

    //Create a Nurse
    createNurse: {
      type: NurseType,
      args: {
        name: { type: new 
      GraphQLNonNull(GraphQLString) }, //The name cannot be null
        username: { type: new 
      GraphQLNonNull(GraphQLString) },
        password: { type: new 
      GraphQLNonNull(GraphQLString) },
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
        id: { type: new 
      GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Nurse.findByIdAndRemove(args.id);
      },
    },
    //Add a Patient
    createPatient: {
      type: PatientType,
      args: {
        name: { type: new 
      GraphQLNonNull(GraphQLString) }, //The name cannot be null
        username: { type: new 
      GraphQLNonNull(GraphQLString) },
        password: { type: new 
      GraphQLNonNull(GraphQLString) },
        temperature: { type: new 
      GraphQLNonNull(GraphQLInt) },
        heartRate: { type: new 
      GraphQLNonNull(GraphQLInt) },
        bloodPressure: { type: new 
      GraphQLNonNull(GraphQLString) },
        weight: { type: new 
      GraphQLNonNull(GraphQLInt) },
      //  motivationalTip: { type: new 
     // GraphQLNonNull(GraphQLString) },
        nurseId: { type: new 
      GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        try {
          const existingPatient = await Patient.findOne({
            username: args.username,
          });
          if (existingPatient) {
            throw new Error("Patient already exists!");
          }
          const hashedPassword = await bcrypt.hash(args.password, 12);

          const patient = new Patient({
            name: args.name,
            username: args.username,
            password: hashedPassword,
            temperature: args.temperature,
            heartRate: args.heartRate,
            bloodPressure: args.bloodPressure,
            weight: args.weight,
         //   motivationalTip: args.motivationalTip,
            nurseId: args.nurseId,
          });
          const result = await patient.save();
          return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
          throw err;
        }
      },
    },
    //Update a Patient
    updatePatient: {
      type: PatientType,
      args: {
        id: { type: new 
      GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        temperature: { type: GraphQLInt },
        heartRate: { type: GraphQLInt },
        bloodPressure: { type: GraphQLString },
        weight: { type: GraphQLInt },
      //  motivationalTip: { type: GraphQLString },
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
            // motivationalTip: args.motivationalTip,
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
        id: { type: new 
      GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Patient.findByIdAndRemove(args.id);
      },
    },
    //Add an Emergency Alert
    createAlert: {
      type: EmergencyAlertType,
      args: {
        message: { type: new 
      GraphQLNonNull(GraphQLString) },
        patientId: { type: new 
      GraphQLNonNull(GraphQLID) },
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
        id: { type: new 
      GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return EmergencyAlert.findByIdAndRemove(args.id);
      },
    },
    addMotivationalTip: {
      type : AddMotivationalTip,
    args: {
    tip: { type: new GraphQLNonNull(GraphQLString) },
    nurse: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent, args) {
    try {
      // Find the nurse who added the tip
      const nurse = await Nurse.findById(args.nurse);
      if (!nurse) {
        throw new Error('Nurse not found');
      }

      // Create a new motivational tip
      const tip = new MotivationalTip({
        tip: args.tip,
        nurse: nurse._id,
      });

      // Save the new tip to the database
      const savedTip = await tip.save();

      // Return the saved tip data
      return {
        tip: savedTip.tip,
        nurse: nurse.name,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
    },

    
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
