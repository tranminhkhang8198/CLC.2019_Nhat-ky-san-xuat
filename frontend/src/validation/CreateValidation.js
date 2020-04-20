/* eslint-disable import/prefer-default-export */

export function validateScopeOfUsePPPInput(input) {
  const errors = [];

  input.scopeOfUse.forEach((item) => {
    if (!item.phi) {
      errors.push('Không được bỏ trống trường: Phi');
    }

    if (!item.plant) {
      errors.push('Không được bỏ trống trường: Tên cây mà thuốc tác dụng');
    }
  });

  return errors;
}

export function validatePPPInput(input) {
  const errors = [];

  if (!input.name) {
    errors.push('Không được bỏ trống trường: Tên thuốc bảo vệ thực vật');
  }

  if (!input.activeIngredient) {
    errors.push('Không được bỏ trống trường: Tên hoạt chất');
  }

  if (!input.content) {
    errors.push('Không được bỏ trống trường: Hàm lượng sử dụng của thuốc');
  }

  // REGISTRATION
  if (!input.registrationInfo.registrationUnit) {
    errors.push('Không được bỏ trống trường: Tên cửa hàng');
  }

  if (!input.registrationInfo.registrationUnitAddress) {
    errors.push('Không được bỏ trống trường: Địa chỉ cửa hàng');
  }

  if (!input.registrationInfo.manufacturer) {
    errors.push('Không được bỏ trống trường: Nhà sản xuất');
  }

  if (!input.registrationInfo.manufacturerAddress) {
    errors.push('Không được bỏ trống trường: Địa chỉ nhà sản xuất');
  }

  input.scopeOfUse.forEach((item) => {
    if (!item.phi) {
      errors.push('Không được bỏ trống các trường: Phi');
    }

    if (!item.plant) {
      errors.push('Không được bỏ trống các trường: Tên cây thuốc tác dụng');
    }
  });

  return errors;
}

export function validateFertilizerInput(input) {
  const errors = [];

  if (!input.name) {
    errors.push('Không được bỏ trống trường: Tên phân bón');
  }

  if (!input.type) {
    errors.push('Không được bỏ trống trường: Loại phân bón');
  }

  return errors;
}

export function validateCooperativeInput(input) {
  const errors = [];

  if (!input.name) {
    errors.push('Không được bỏ trống trường: Tên hợp tác xã');
  }

  if (!input.foreignName) {
    errors.push('Không được bỏ trống trường: Tên tiếng Anh');
  }

  if (!input.abbreviationName) {
    errors.push('Không được bỏ trống trường: Tên viết tắt');
  }

  if (!input.cooperativeID) {
    errors.push('Không được bỏ trống trường: Mã hợp tác xã');
  }

  if (!input.surrgate) {
    errors.push('Không được bỏ trống trường: Người đại diện');
  }

  if (!input.director) {
    errors.push('Không được bỏ trống trường: Giám đốc hợp tác xã');
  }

  if (!input.phone) {
    errors.push('Không được bỏ trống trường: Số điện thoại');
  }

  if (!input.representOffice) {
    errors.push('Không được bỏ trống trường: Văn phòng đại diện');
  }

  return errors;
}
