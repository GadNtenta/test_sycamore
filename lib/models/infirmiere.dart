class Infirmiere {
  final String firstName;
  final String lastName;
  final String service;
  final String phone;

  Infirmiere({
    required this.firstName,
    required this.lastName,
    required this.service,
    required this.phone,
  });

  factory Infirmiere.fromJson(Map<String, dynamic> json) {
    return Infirmiere(
      firstName: json['firstName']?.toString() ?? '',
      lastName: json['lastName']?.toString() ?? '',
      service: json['service']?.toString() ?? '',
      phone: json['phone']?.toString() ?? '',
    );
  }
}
