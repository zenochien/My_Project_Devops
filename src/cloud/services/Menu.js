const MenuModel = require('../models/Menu');
const StylistModel = require('../models/Stylist');
const BaseQuery = require('../BaseQuery');

const Errors = require('../../const/Errors');
const DefaultSelectFields = require('../../const/DefaultSelectFields');
const Helper = require('../../utils/helper');

const PostModel = require('../models/Post');
const { STATUS } = require('../../const/Constants');

const menuService = {
  checkAvailableMenu: async (menuIds) => {
    const menus = await MenuModel.findByQuery({
      _id: {
        $in: menuIds,
      },
    });
    if (menus.length === menuIds.length) {
      return true;
    }
    return false;
  },

  getAddRemoveMenus: (oldMenus, newMenus) => {
    const remove = [];
    const add = [];
    oldMenus.forEach((menu) => {
      if (!newMenus.includes(menu)) {
        remove.push(menu);
      }
    });

    newMenus.forEach((menu) => {
      if (!oldMenus.includes(menu)) {
        add.push(menu);
      }
    });
    return {
      remove,
      add,
    };
  },
  getCurrentStylistMenu: (stylistId, salonId, status) => {
    return MenuModel.getStylelistMenu(stylistId, salonId, status);
  },

  buildMenuItemInfo: (parseMenuItem) => {
    return Helper.convertParseObjectToJson(parseMenuItem, DefaultSelectFields.MENU);
  },

  getStylistMenusParse: async (stylist, status) => {
    const menuQuery = BaseQuery.getMenuQuery();
    menuQuery.containedIn('status', status);
    menuQuery.containedIn('assignedStylistIds', [stylist.id]);
    menuQuery.equalTo('salon', stylist.get('salon'));
    menuQuery.select(DefaultSelectFields.MENU);
    const menus = await menuQuery.find({ useMasterKey: true });
    return menus.map(menuService.buildMenuItemInfo);
  },

  processMenusIds: async (menuIds, stylist, status) => {
    const stylistId = stylist.id;
    const salon = stylist.get('salon');
    const salonId = salon.id;
    await StylistModel.verifyStylists([stylistId], salon);

    const isAvailableMenu = await menuService.checkAvailableMenu(menuIds);
    if (!isAvailableMenu) {
      const { code, message } = Errors.OBJECT_NOT_FOUND;
      throw new Parse.Error(code, message);
    }

    const curentMenus = await menuService.getCurrentStylistMenu(stylistId, salonId, status);
    const curentMenusIds = curentMenus.map((value) => value._id);
    const { remove, add } = menuService.getAddRemoveMenus(curentMenusIds, menuIds);
    return {
      stylistId,
      salonId,
      curentMenus,
      remove,
      add,
    };
  },

  assignMenus: async (stylistId, add, remove, salonId, status, isSendNotification) => {
    const promisesMenus = [
      MenuModel.addStylitToMenu(stylistId, add, salonId, status),
      MenuModel.removeStylitToMenu(stylistId, remove, salonId, status),
    ];
    await Promise.all(promisesMenus);
    if (remove.length > 0) {
      PostModel.unPublishedPostByMenuIds(stylistId, remove, isSendNotification);
    }
    return {
      stylistId,
      salonId,
    };
  },
};

module.exports = menuService;
