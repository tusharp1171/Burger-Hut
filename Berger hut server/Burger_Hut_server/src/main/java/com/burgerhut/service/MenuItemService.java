package com.burgerhut.service;
import com.burgerhut.entity.MenuItem;
import com.burgerhut.enums.MenuCategory;

import java.util.List;

public interface MenuItemService {
    MenuItem saveMenuItem(MenuItem item);
    MenuItem updateMenuItem(Long id, MenuItem item);
    MenuItem getMenuItemById(Long id);
    List<MenuItem> getAllMenuItems();
    List<MenuItem> getAvailableItems();
    List<MenuItem> getByCategory(MenuCategory category);
    void deleteMenuItem(Long id);
}