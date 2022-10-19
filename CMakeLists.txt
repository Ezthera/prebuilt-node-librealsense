# Copyright (c) 2017 Intel Corporation. All rights reserved.
# Use of this source code is governed by an Apache 2.0 license
# that can be found in the LICENSE file.

project(node_librealsense CXX)

cmake_minimum_required(VERSION 3.15)
cmake_policy(SET CMP0091 NEW)
cmake_policy(SET CMP0042 NEW)

if (CMAKE_CXX_COMPILER_ID STREQUAL "Clang")
    set(ELECTRON_BUILD 1)
endif()

set(CMAKE_CXX_STANDARD 11)

set(node_librealsense_VERSION_MAJOR "0")
set(node_librealsense_VERSION_MINOR "2130")
set(node_librealsense_VERSION_PATCH "1")
set(node_librealsense_VERSION "${node_librealsense_VERSION_MAJOR}.${node_librealsense_VERSION_MINOR}")
set(node_librealsense_VERSION_FULL "${node_librealsense_VERSION}.${node_librealsense_VERSION_PATCH}")

file(GLOB ADDON_SOURCES "src/*.cpp")
add_library(${PROJECT_NAME} SHARED ${ADDON_SOURCES} ${CMAKE_JS_SRC})

set_target_properties(${PROJECT_NAME} PROPERTIES
    PREFIX ""
    SUFFIX ".node"
)

include(CheckPIESupported)
check_pie_supported()
set_property(TARGET ${PROJECT_NAME} PROPERTY POSITION_INDEPENDENT_CODE TRUE)

target_compile_definitions(${PROJECT_NAME} PRIVATE _FORTIFY_SOURCE=2)

target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_JS_INC} include)

add_definitions(-DVERSION${node_librealsense_VERSION_FULL})

if (ELECTRON_BUILD)
    target_include_directories(${PROJECT_NAME} PRIVATE $ENV{LIBCXX_DIR}/include/c++/v1)
endif()

target_link_libraries(${PROJECT_NAME} PRIVATE ${CMAKE_JS_LIB})

if (MSVC)
    add_definitions(-DWIN32_LEAN_AND_MEAN)
    add_definitions(-DVC_EXTRALEAN)

    target_compile_options(${PROJECT_NAME} PRIVATE /O2)

    target_link_libraries(${PROJECT_NAME} PRIVATE ${PROJECT_SOURCE_DIR}/realsense2/win-x64/realsense2.lib)

    if (ELECTRON_BUILD)
        target_link_libraries(${PROJECT_NAME} PRIVATE $ENV{LIBCXX_DIR}/lib/Release/c++.lib)
    endif()
elseif(UNIX)
    target_link_directories(${PROJECT_NAME} PRIVATE ${PROJECT_SOURCE_DIR}/realsense2/linux)
    target_link_libraries(${PROJECT_NAME} PRIVATE librealsense2.so.2.51)

    target_compile_options(${PROJECT_NAME} PRIVATE
        -Wno-deprecated-declarations
        -Wno-switch
        -fstack-protector-strong
        -O2
        -D_FORTIFY_SOURCE=2
        -Wformat
        -Wformat-security)

    if (ELECTRON_BUILD)
        target_compile_options(${PROJECT_NAME} PRIVATE
            -stdlib=libc++
            -nostdinc++
            -nodefaultlibs)

        target_link_libraries(${PROJECT_NAME} PRIVATE c c++ c++abi gcc_s)
    endif()
endif()
