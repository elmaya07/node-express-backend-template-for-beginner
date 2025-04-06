import { Sequelize } from "sequelize";
import { db } from "../config/database.js";

const Menus = db.define("menus", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
parent_id:{
  type: Sequelize.INTEGER,
},
type: {
    type: Sequelize.ENUM('dropdown','normal'),
    defaultValue:'normal'
},
title: {
    type: Sequelize.STRING,
    
},
iconClass: {
    type: Sequelize.STRING,
    
},
name: {
    type: Sequelize.STRING,
    
},
badgeCount: {
    type: Sequelize.INTEGER,
    
},
collapseId: {
    type: Sequelize.STRING,
    
},
path: {
    type: Sequelize.STRING,
    
},    
createdAt: {
    type: Sequelize.DATE,
    
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
},
updatedAt: {
    type: Sequelize.DATE,
    
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
},
})

export default Menus;