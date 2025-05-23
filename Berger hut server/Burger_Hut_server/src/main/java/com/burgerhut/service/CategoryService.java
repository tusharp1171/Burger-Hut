package com.burgerhut.service;

import java.util.List;
import java.util.Optional;

import com.burgerhut.entity.Category;

public interface CategoryService {
    Category saveCategory(Category category);
    Category getCategoryById(Long id);
    Optional<Category> getByName(String name);
    List<Category> getAllCategories();
    void deleteCategory(Long id);
}